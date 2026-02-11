package giuliomarra.vinylvault.dto;

import giuliomarra.vinylvault.model.CartItem;

import java.util.List;

public record CartResponse(
        List<CartItem> items,
        Double total
) {
}