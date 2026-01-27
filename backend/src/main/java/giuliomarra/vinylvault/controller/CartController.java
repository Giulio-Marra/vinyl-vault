package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.AddToCartRequest;
import giuliomarra.vinylvault.dto.CartResponse;
import giuliomarra.vinylvault.dto.UpdateCartItemRequest;
import giuliomarra.vinylvault.model.CartItem;
import giuliomarra.vinylvault.model.User;
import giuliomarra.vinylvault.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/me")
    public CartResponse getMyCart(@AuthenticationPrincipal User user) {
        return cartService.getCartItems(user);
    }

    @PostMapping("/me/items")
    @ResponseStatus(HttpStatus.CREATED)
    public CartItem addVinylToCart(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AddToCartRequest request
    ) {
        return cartService.addVinylToCart(user, request);
    }

    @PutMapping("/me/items/{itemId}")
    public CartItem updateCartItem(
            @AuthenticationPrincipal User user,
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemRequest request
    ) {
        return cartService.updateCartItem(user, itemId, request);
    }

    @DeleteMapping("/me/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCartItem(
            @AuthenticationPrincipal User user,
            @PathVariable Long itemId
    ) {
        cartService.removeCartItem(user, itemId);
    }
}   