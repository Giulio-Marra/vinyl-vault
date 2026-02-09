package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.OrderItemDTO;
import giuliomarra.vinylvault.dto.OrderResponse;
import giuliomarra.vinylvault.enums.PaymentStatus;
import giuliomarra.vinylvault.exceptions.BadRequestException;
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

    public OrderService(OrderRepository orderRepository, CartService cartService, StripeService stripeService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.stripeService = stripeService;
    }

    @Transactional
    public OrderResponse createOrder(User user) {
        Cart cart = cartService.getCartByUser(user);
        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is Empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderStatus(PaymentStatus.PENDING);
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
            cartService.clearCart(user);
            return convertToDTO(savedOrder, session.getUrl());
        } catch (Exception e) {
            throw new RuntimeException("Error session payment: " + e.getMessage());
        }
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
                checkoutUrl
        );
    }
}