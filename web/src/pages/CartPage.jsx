import React, { useEffect, useState } from "react";
import { getMyCart } from "../features/cart/redux/cartService";
import { Col, Container, Row } from "react-bootstrap";
import CartVinylCard from "../features/cart/components/CartVinylCard";
import { ScaleLoader } from "react-spinners";
import CartSummary from "../features/cart/components/CartSummary";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const data = await getMyCart(token);
        setCart(data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <ScaleLoader color="white" height={20} />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container className="mt-5">
        <h1 className="text-white">Your Cart</h1>
        <p className="text-secondary">Your cart is empty.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={8} className="p-2">
          <div className="border-bottom border-secondary">
            <div className="d-flex align-items-center">
              <h1 className="me-4 text-white">Your Cart</h1>
              <span className="text-secondary">
                ({cart.items.length} items)
              </span>
            </div>
            <p className="text-secondary">Free shipping on order over $30</p>
          </div>
          <div>
            {cart.items.map((item) => (
              <CartVinylCard key={item.id} vinyl={item} />
            ))}
          </div>
        </Col>
        <Col md={4} className="p-2">
          <CartSummary summary={cart} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
