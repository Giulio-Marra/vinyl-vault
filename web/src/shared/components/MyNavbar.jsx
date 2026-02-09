import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser, FaMagnifyingGlass } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { getUserAction } from "../../features/auth/redux/authTunks";
import { fetchCartCount } from "../../features/cart/redux/cartThunks";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const itemCount = useSelector((state) => state.cart.itemCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/catalog?search=${query}`);
  };

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (token) {
        dispatch(fetchCartCount(token));
      }
    }
  }, [dispatch, user]);

  return (
    <Navbar expand="lg" className="navBar fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          Vinyl Vault
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="border-0">
          <span className="navbar-toggler-icon-custom"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/catalog" className="navLink">
              Shop All
            </Nav.Link>
          </Nav>

          <Form
            onSubmit={handleSubmit}
            className="searchBarNav mx-auto"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <FaMagnifyingGlass />
            <FormControl
              type="text"
              placeholder="Search Artist, Album..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </Form>

          <div className="d-flex align-items-center gap-2 ms-auto">
            {user ? (
              <Button
                className="btnNavBar d-flex align-items-center justify-content-center"
                onClick={() => navigate("/profile")}
                style={{ minWidth: "40px", height: "40px" }}
              >
                <FaUser />
              </Button>
            ) : (
              <Button className="btnNavBar" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}

            <Button
              className="btnNavBar position-relative d-flex align-items-center justify-content-center"
              onClick={() => navigate("/cart")}
              style={{ minWidth: "40px", height: "40px", overflow: "visible" }}
            >
              <FaShoppingCart />
              {itemCount > 0 && (
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  style={{
                    top: "-5px",
                    right: "-5px",
                    transform: "none",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
