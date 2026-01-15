import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";

const MyNavbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/catalog?search=${query}`);
  };

  return (
    <div className="navBar">
      <div className="navBarSectionLogo">
        <h2>Vinyl Vault</h2>
        <Link className="navLink" to={"/catalog"}>
          Shop All
        </Link>
        <Link className="navLink">New Arrivals </Link>
        <Link className="navLink">Sale </Link>
      </div>
      <div className="navBarSectionRight">
        <form onSubmit={handleSubmit}>
          <div className="searchBarNav">
            <FaMagnifyingGlass />
            <input
              value={query}
              type="text"
              placeholder="Search Artist, Album..."
              onChange={(e) => setQuery(e.target.value)}
            />
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
