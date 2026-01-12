import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";

const MyNavbar = () => {
  return (
    <div className="navBar">
      <div className="navBarSectionLogo">
        <h2>Vinyl Vault</h2>
        <Link className="navLink">Shop All</Link>
        <Link className="navLink">New Arrivals </Link>
        <Link className="navLink">Sale </Link>
      </div>
      <div className="navBarSectionRight">
        <form>
          <div className="searchBarNav">
            <FaMagnifyingGlass />
            <input type="text" placeholder="Search Artist, Album..." />
          </div>
        </form>
        <button className="btnNavBar">
          <FaUser />
        </button>
        <button className="btnNavBar">
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default MyNavbar;
