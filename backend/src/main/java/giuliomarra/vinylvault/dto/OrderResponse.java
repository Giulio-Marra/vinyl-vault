package giuliomarra.vinylvault.dto;

import java.util.List;

public record OrderResponse(
        Long id,
        Double totalPrice,
        String status,
        List<OrderItemDTO> items,
        String checkoutUrl
) {
}
