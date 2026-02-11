package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.OrderItemDTO;
import giuliomarra.vinylvault.dto.OrderResponse;
import giuliomarra.vinylvault.enums.OrderStatus;
import giuliomarra.vinylvault.exceptions.BadRequestException;
import giuliomarra.vinylvault.exceptions.NotFoundException;
import giuliomarra.vinylvault.model.*;
import giuliomarra.vinylvault.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final StripeService stripeService;
    private final VinylService vinylService;

    public OrderService(OrderRepository orderRepository, CartService cartService, StripeService stripeService, VinylService vinylService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.stripeService = stripeService;
        this.vinylService = vinylService;
    }

    @Transactional
    public OrderResponse createOrder(User user) {
        Cart cart = cartService.getCartByUser(user);
        if (cart.getItems().isEmpty()) throw new BadRequestException("Cart Is Empty");

        for (CartItem item : cart.getItems()) {
            if (item.getVinyl().getStock() < item.getQuantity()) {
                throw new BadRequestException("No Stock for: " + item.getVinyl().getTitle());
            }
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        double total = 0;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setVinyl(cartItem.getVinyl());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(cartItem.getVinyl().getPrice());
            order.addOrderItem(orderItem);
            total += orderItem.getPriceAtPurchase() * orderItem.getQuantity();
        }

        order.setTotalPrice(total);
        Order savedOrder = orderRepository.save(order);

        try {

            var session = stripeService.createCheckoutSession(savedOrder);
            savedOrder.setStripeSessionId(session.getId());
            orderRepository.save(savedOrder);


            return convertToDTO(savedOrder, session.getUrl());
        } catch (Exception e) {
            throw new BadRequestException("Error during stripe session: " + e.getMessage());
        }
    }

    @Transactional
    public OrderResponse confirmPayment(String sessionId) {

        Order order = orderRepository.findByStripeSessionId(sessionId)
                .orElseThrow(() -> new NotFoundException("Order not found: " + sessionId));


        if (order.getOrderStatus() == OrderStatus.COMPLETED) {
            return convertToDTO(order, null);
        }


        for (OrderItem item : order.getItems()) {
            Vinyl vinyl = item.getVinyl();
            int currentStock = vinyl.getStock();
            int quantityPurchased = item.getQuantity();

            if (currentStock < quantityPurchased) {
                throw new BadRequestException("Out of stock " + vinyl.getTitle());
            }

            vinylService.updateStock(vinyl.getId(), currentStock - quantityPurchased);
        }


        order.setOrderStatus(OrderStatus.COMPLETED);
        Order updatedOrder = orderRepository.save(order);

        cartService.clearCart(order.getUser());

        return convertToDTO(updatedOrder, null);
    }

    private OrderResponse convertToDTO(Order order, String checkoutUrl) {
        List<OrderItemDTO> itemDTOs = order.getItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getVinyl().getId(),
                        item.getQuantity(),
                        item.getPriceAtPurchase(),
                        item.getVinyl().getTitle(),
                        item.getVinyl().getUrlImage(),
                        item.getVinyl().getArtist().getName()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getTotalPrice(),
                order.getOrderStatus().toString(),
                itemDTOs,
                checkoutUrl,
                order.getCreatedAt()
        );
    }

    public List<OrderResponse> getUserOrders(User user) {
        List<Order> orders = orderRepository.findByUserOrderByCreatedAtDesc(user);

        return orders.stream()
                .map(order -> convertToDTO(order, null))
                .toList();
    }
}