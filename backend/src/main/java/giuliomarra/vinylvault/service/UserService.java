package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.NewUserRequiredDto;
import giuliomarra.vinylvault.dto.TokenResponseDto;
import giuliomarra.vinylvault.dto.UserLoginRequiredDto;
import giuliomarra.vinylvault.enums.Role;
import giuliomarra.vinylvault.model.User;
import giuliomarra.vinylvault.repository.UserRepository;
import giuliomarra.vinylvault.security.JwtTool;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder bcrypt;
    private final JwtTool jwtTool;

    public UserService(UserRepository userRepository, PasswordEncoder bcrypt, JwtTool jwtTool) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwtTool = jwtTool;
    }
    
    public User saveNewUser(NewUserRequiredDto body) {
        if (userRepository.existsByEmail(body.email())) {
            throw new RuntimeException("Email gia in uso");
        }
        if (userRepository.existsByUsername(body.username())) {
            throw new RuntimeException("Username gia in uso");
        }

        User user = new User(
                body.username(),
                body.email(),
                bcrypt.encode(body.password()),
                Role.USER
        );

        return userRepository.save(user);
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utente con id: " + userId + " non trovato!"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Credenziali errate"));
    }

    public TokenResponseDto login(UserLoginRequiredDto body) {
        User userApp = findByEmail(body.email());
        if (bcrypt.matches(body.password(), userApp.getPassword())) {
            return new TokenResponseDto(jwtTool.createToken(userApp));
        } else {
            throw new RuntimeException("Credenziali errate");
        }
    }
}
