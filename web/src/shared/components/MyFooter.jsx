import React from "react";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <footer className="footerContainer py-5">
        <Container>
          <Row className="gy-4">
            <Col xs={12} sm={6} md={3}>
              <h3>Shop</h3>
              <div className="d-flex flex-column gap-2">
                <Link to="/products">Products</Link>
                <Link to="/collections">Collections</Link>
                <Link to="/new">New Arrivals</Link>
                <Link to="/sale">Sale</Link>
              </div>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h3>Support</h3>
              <div className="d-flex flex-column gap-2">
                <Link to="/help">Help Center</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/shipping">Shipping</Link>
                <Link to="/returns">Returns</Link>
              </div>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h3>Company</h3>
              <div className="d-flex flex-column gap-2">
                <Link to="/about">About Us</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <h3>Follow Us</h3>
              <div className="d-flex gap-3 fs-4">
                <Link to="https://instagram.com" target="_blank">
                  <SlSocialInstagram />
                </Link>
                <Link to="https://twitter.com" target="_blank">
                  <SlSocialTwitter />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      <div className="footerCopyright text-center py-3">
        <p className="m-0">© 2024 VinylVault. All rights reserved.</p>
      </div>
    </>
  );
};

export default MyFooter;
