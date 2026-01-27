package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.NewUserRequiredDto;
import giuliomarra.vinylvault.dto.TokenResponseDto;
import giuliomarra.vinylvault.dto.UserLoginRequiredDto;
import giuliomarra.vinylvault.model.User;
import giuliomarra.vinylvault.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Validated NewUserRequiredDto body) {
        return ResponseEntity.ok(userService.saveNewUser(body));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody @Validated UserLoginRequiredDto body) {
        return ResponseEntity.ok(userService.login(body));
    }


}
