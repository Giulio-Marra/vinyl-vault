package giuliomarra.vinylvault.dto;

import jakarta.validation.constraints.NotNull;

public record NewArtistRequiredDto(
        @NotNull(message = "Nome artista richiesto")
        String name,
        @NotNull(message = "Info artista richiesto")
        String about,
        @NotNull(message = "UrlImmagine artista richiesta")
        String urlImage
) {
}
