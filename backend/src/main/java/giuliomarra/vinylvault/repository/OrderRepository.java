package giuliomarra.vinylvault.repository;

import giuliomarra.vinylvault.model.Order;
import giuliomarra.vinylvault.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByStripeSessionId(String stripeSessionId);

    List<Order> findByUserOrderByCreatedAtDesc(User user);
}
