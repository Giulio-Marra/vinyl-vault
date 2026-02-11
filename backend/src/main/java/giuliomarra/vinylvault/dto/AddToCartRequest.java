package giuliomarra.vinylvault.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddToCartRequest(
        @NotNull(message = "Vinyl ID is required")
        Long vinylId,

        @Min(value = 1, message = "Quantity must be at least 1")
        Integer quantity
) {
}
