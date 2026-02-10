package giuliomarra.vinylvault.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        Double totalPrice,
        String status,
        List<OrderItemDTO> items,
        String checkoutUrl,
        LocalDateTime createdAt
) {
}
