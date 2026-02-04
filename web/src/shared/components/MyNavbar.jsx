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
    <Navbar expand="lg" className="navBar">
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

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Form onSubmit={handleSubmit} className="searchBarNav">
              <FaMagnifyingGlass />
              <FormControl
                type="text"
                placeholder="Search Artist, Album..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
            </Form>

            {user ? (
              <Button
                className="btnNavBar"
                onClick={() => navigate("/profile")}
              >
                <FaUser />
              </Button>
            ) : (
              <Button className="btnNavBar" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}

            <Button
              className="btnNavBar position-relative "
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart />
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
