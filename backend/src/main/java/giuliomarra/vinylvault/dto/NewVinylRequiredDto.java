package giuliomarra.vinylvault.dto;

import java.util.List;

public record NewVinylRequiredDto(
        String title,
        String urlImage,
        String description,
        Double price,
        Integer stock,
        Long artistId,
        List<Long> genreListId,
        List<NewTrackRequiredDto> tracks
) {
}
