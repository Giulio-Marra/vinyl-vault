package giuliomarra.vinylvault.dto;

public record OrderItemDTO(
        Long id,
        Integer quantity,
        Double priceAtPurchase,
        String vinylTitle,
        String vinylImageUrl,
        String artistName
) {
}
