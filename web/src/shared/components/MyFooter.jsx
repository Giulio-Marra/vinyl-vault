import React from "react";
import { SlSocialInstagram, SlSocialTwitter } from "react-icons/sl";
import { Link } from "react-router";

const MyFooter = () => {
  return (
    <>
      <div className="footerContainer">
        <div>
          <h3>Shop</h3>
          <Link to="/products">Products</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/new">New Arrivals</Link>
          <Link to="/sale">Sale</Link>
        </div>
        <div>
          <h3>Support</h3>
          <Link to="/help">Help Center</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns">Returns</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="colLinkFooter">
          <h3>Follow Us</h3>
          <Link to="https://instagram.com" target="_blank">
            <SlSocialInstagram />
          </Link>
          <Link to="https://twitter.com" target="_blank">
            <SlSocialTwitter />
          </Link>
        </div>
      </div>
      <div className="footerCopyright">
        <p>© 2024 VinylVault. All rights reserved.</p>
      </div>
    </>
  );
};

export default MyFooter;
