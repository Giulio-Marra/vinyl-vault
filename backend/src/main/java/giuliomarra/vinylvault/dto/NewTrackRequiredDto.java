package giuliomarra.vinylvault.dto;

public record NewTrackRequiredDto(
        String title,
        Integer trackNumber,
        String side,
        Double duration
) {
}
