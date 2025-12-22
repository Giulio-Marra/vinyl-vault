package giuliomarra.vinylvault.dto;

public record TrackResponseDto(
        Long id,
        String title,
        Integer trackNumber,
        String side,
        Double duration
) {
}
