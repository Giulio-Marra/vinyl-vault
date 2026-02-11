package giuliomarra.vinylvault.repository;

import giuliomarra.vinylvault.model.Cart;
import giuliomarra.vinylvault.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
