import React, { useEffect, useState } from "react";
import {
  Container,
  Badge,
  Card,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { getMyOrders } from "../features/cart/redux/cartService";
import { useNavigate } from "react-router";
import { ScaleLoader } from "react-spinners";

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const data = await getMyOrders(token);

        // Filter out PENDING orders and set state
        const filteredOrders = data.filter(
          (order) => order.status !== "PENDING",
        );
        setOrders(filteredOrders);
      } catch (err) {
        // --- COERENZA ERRORI COME IN HOMEPAGE ---
        if (!err.status) {
          navigate("/error", {
            state: {
              statusCode: "Connection Error",
              message: "Cannot reach server. Please check your connection.",
            },
          });
        } else if (err.status >= 500) {
          navigate("/error", {
            state: {
              statusCode: err.status,
              message: "Server error. Please try again later.",
            },
          });
        } else {
          setError(err.message || "Failed to load your orders");
        }
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const getStatusBadge = (status) => {
    const config = {
      COMPLETED: { bg: "success", text: "PAID" },
      FAILED: { bg: "danger", text: "FAILED" },
      CANCELLED: { bg: "secondary", text: "CANCELLED" },
      SHIPPED: { bg: "info", text: "SHIPPED" },
      DELIVERED: { bg: "primary", text: "DELIVERED" },
    };
    const current = config[status] || { bg: "dark", text: status };
    return (
      <Badge
        bg={current.bg}
        className="px-3 py-2 text-uppercase shadow-sm"
        style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
      >
        {current.text}
      </Badge>
    );
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <ScaleLoader color="#169db9" height={35} width={4} />
      </div>
    );

  return (
    <div
      className="orderPageContainer mt-5"
      style={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      <Container className="pt-5 pb-5">
        <div className="mb-5">
          <h2 className="text-white fw-bold display-6">
            My <span style={{ color: "#169db9" }}>Orders</span>
          </h2>
          <p className="text-secondary">
            Manage your vinyl collection and track your shipments.
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="bg-danger text-white border-0">
            {error}
          </Alert>
        )}

        {orders.length === 0 && !error ? (
          <div className="text-center py-5 rounded-4 bg-dark border border-secondary border-opacity-25 shadow-lg">
            <h3 className="text-white-50 mb-3">Your vault is empty! 🎧</h3>
            <p className="text-secondary mb-4">
              You haven't placed any orders yet.
            </p>
            <button
              className="btnViewCollectionHomePage"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <Row>
            {orders.map((order) => (
              <Col xs={12} key={order.id} className="mb-4">
                <Card className="order-card-custom shadow-lg">
                  <div
                    className={`status-strip ${order.status === "COMPLETED" ? "bg-success" : "bg-info"}`}
                  ></div>

                  <Card.Body className="p-0">
                    <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-secondary border-opacity-10 bg-black bg-opacity-20">
                      <div>
                        <div
                          className="text-secondary small text-uppercase fw-bold mb-1"
                          style={{ letterSpacing: "1px" }}
                        >
                          Transaction Reference
                        </div>
                        <h5 className="mb-0 fw-bold text-white">
                          Order <span className="text-info">#{order.id}</span>
                        </h5>
                      </div>
                      <div className="text-end">
                        {getStatusBadge(order.status)}
                        <div className="text-secondary extra-small mt-2">
                          {new Date(order.createdAt).toLocaleDateString(
                            undefined,
                            { day: "2-digit", month: "long", year: "numeric" },
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center py-3 border-bottom border-secondary border-opacity-10 last-child-border-0"
                        >
                          <div className="position-relative">
                            <img
                              src={item.vinylImageUrl}
                              alt={item.vinylTitle}
                              className="rounded-3 shadow"
                              style={{
                                width: "85px",
                                height: "85px",
                                objectFit: "cover",
                                border: "2px solid #2a2a2a",
                              }}
                            />
                            <Badge
                              bg="info"
                              className="position-absolute top-0 start-0 translate-middle rounded-pill shadow-sm"
                            >
                              {item.quantity}x
                            </Badge>
                          </div>

                          <div className="ms-4 flex-grow-1">
                            <h6 className="mb-1 fw-bold text-white fs-5">
                              {item.vinylTitle}
                            </h6>
                            <p className="text-info mb-0 small uppercase fw-semibold">
                              {item.artistName}
                            </p>
                            <div className="text-secondary small d-md-none">
                              {item.priceAtPurchase.toFixed(2)}€ / unit
                            </div>
                          </div>

                          <div className="text-end d-none d-md-block">
                            <div className="text-secondary small mb-1">
                              Price per unit
                            </div>
                            <span className="fw-bold text-white">
                              {item.priceAtPurchase.toFixed(2)}€
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-black bg-opacity-40 d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-secondary small">
                          Payment Method:{" "}
                        </span>
                        <span className="text-white-50 small">
                          Stripe Secure Check
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="text-secondary me-3 text-uppercase small fw-bold">
                          Grand Total
                        </span>
                        <span className="fw-bold fs-3 text-info">
                          {order.totalPrice.toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default OrderPage;
