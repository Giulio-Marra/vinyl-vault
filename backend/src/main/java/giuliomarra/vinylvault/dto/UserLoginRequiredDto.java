package giuliomarra.vinylvault.dto;

public record UserLoginRequiredDto(
        String email,
        String password
) {
}
