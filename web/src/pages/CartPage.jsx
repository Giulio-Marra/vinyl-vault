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

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ScaleLoader color="white" />
      </div>
    );

  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <Container className="mt-5 text-white">
        <h1>Your Cart is empty</h1>
      </Container>
    );

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col md={8}>
          <h1 className="text-white">Your Cart ({cart.items.length})</h1>
          {cart.items.map((item) => (
            <CartVinylCard key={item.id} vinyl={item} />
          ))}
        </Col>
        <Col md={4}>
          <CartSummary summary={cart} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
