package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.AddToCartRequest;
import giuliomarra.vinylvault.dto.CartResponse;
import giuliomarra.vinylvault.dto.UpdateCartItemRequest;
import giuliomarra.vinylvault.exceptions.BadRequestException;
import giuliomarra.vinylvault.exceptions.NotFoundException;
import giuliomarra.vinylvault.model.Cart;
import giuliomarra.vinylvault.model.CartItem;
import giuliomarra.vinylvault.model.User;
import giuliomarra.vinylvault.model.Vinyl;
import giuliomarra.vinylvault.repository.CartItemRepository;
import giuliomarra.vinylvault.repository.CartRepository;
import giuliomarra.vinylvault.repository.VinylRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final VinylRepository vinylRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       VinylRepository vinylRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.vinylRepository = vinylRepository;
    }

    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart(user);
                    return cartRepository.save(newCart);
                });
    }

    public CartResponse getCartItems(User user) {
        Cart cart = getCartByUser(user);
        double total = calculateTotal(cart.getItems());
        return new CartResponse(cart.getItems(), total);
    }

    @Transactional
    public CartItem addVinylToCart(User user, AddToCartRequest request) {
        Vinyl vinyl = vinylRepository.findById(request.vinylId())
                .orElseThrow(() -> new NotFoundException("Vinyl not found with id: " + request.vinylId()));

        if (vinyl.getStock() == null || vinyl.getStock() < request.quantity()) {
            throw new BadRequestException("Insufficient stock for vinyl: " + vinyl.getTitle());
        }

        Cart cart = getCartByUser(user);

        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getVinyl().getId().equals(request.vinylId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            int newQuantity = existingItem.getQuantity() + request.quantity();

            if (vinyl.getStock() < newQuantity) {
                throw new BadRequestException("Cannot add " + request.quantity() + " items. Only " +
                        (vinyl.getStock() - existingItem.getQuantity()) + " available");
            }

            existingItem.setQuantity(newQuantity);
            return cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem(cart, vinyl, request.quantity(), vinyl.getPrice());
            cart.getItems().add(newItem);
            return cartItemRepository.save(newItem);
        }
    }

    @Transactional
    public CartItem updateCartItem(User user, Long cartItemId, UpdateCartItemRequest request) {
        Cart cart = getCartByUser(user);

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Cart item not found"));

        if (item.getVinyl().getStock() < request.quantity()) {
            throw new BadRequestException("Insufficient stock. Available: " +
                    item.getVinyl().getStock());
        }

        item.setQuantity(request.quantity());
        return cartItemRepository.save(item);
    }

    @Transactional
    public void removeCartItem(User user, Long cartItemId) {
        Cart cart = getCartByUser(user);

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Cart item not found"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);
    }

    private double calculateTotal(List<CartItem> items) {
        return items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }
}