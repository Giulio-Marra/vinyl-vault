package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.OrderResponse;
import giuliomarra.vinylvault.model.User;
import giuliomarra.vinylvault.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(@AuthenticationPrincipal User user) {
        OrderResponse response = orderService.createOrder(user);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/confirm")
    public ResponseEntity<OrderResponse> confirm(@RequestParam String sessionId) {
        OrderResponse response = orderService.confirmPayment(sessionId);
        return ResponseEntity.ok(response);
    }
}
