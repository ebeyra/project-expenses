import React from "react";
import { Link } from "react-router-dom";
import fakelogo from "../../assets/images/fakelogo.svg";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-success p-2">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand h5" id="top">
          <img src={fakelogo} alt="logo" className="mx-2" />
          Iron Money
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
              <Link to="/login" className="nav-link h5 me-3">
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
