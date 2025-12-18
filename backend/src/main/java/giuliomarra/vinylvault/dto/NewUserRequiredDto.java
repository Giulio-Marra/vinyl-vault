package giuliomarra.vinylvault.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewUserRequiredDto(
        @NotBlank(message = "Username obbligatorio")
        @Size(min = 5, max = 12, message = "Username deve essere tra 6 e 12 caratteri")
        String username,

        @NotBlank(message = "Email obbligatoria")
        @Email(message = "Email non valida")
        String email,

        @NotBlank(message = "Password obbligatoria")
        @Size(min = 8, message = "La password deve avere almeno 8 caratteri")
        String password
) {
}
