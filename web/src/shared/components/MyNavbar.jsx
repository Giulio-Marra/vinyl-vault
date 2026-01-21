import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const MyNavbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.vinyl.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/catalog?search=${query}`);
  };

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
            <Nav.Link className="navLink">New Arrivals</Nav.Link>
            <Nav.Link className="navLink">Sale</Nav.Link>
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

            <Button className="btnNavBar">
              <FaUser />
            </Button>

            <Button className="btnNavBar position-relative">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
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
