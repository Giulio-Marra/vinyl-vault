package giuliomarra.vinylvault.dto;

import jakarta.validation.constraints.NotEmpty;

public record NewGenreRequiredDto(
        @NotEmpty(message = "Il genere non puo essere vuoto")
        String name
) {
}
