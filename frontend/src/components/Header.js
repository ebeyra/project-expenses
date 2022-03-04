import React from "react";
import { Link } from "react-router-dom";
import fakelogo from "../public/assets/images/fakelogo.svg";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-success p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" id="top">
          <img src={fakelogo} alt="logo" className="mx-2" />
          Expense App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
