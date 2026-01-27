package giuliomarra.vinylvault.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NewUserRequiredDto(

        @NotBlank(message = "Username is required")
        @Size(min = 5, max = 12, message = "Username must be between 5 and 12 characters")
        String username,

        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password
) {
}
