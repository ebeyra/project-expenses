import React from "react";
import { Link } from "react-router-dom";
import fakelogo from "../../assets/images/fakelogo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 bg-dark">
        <p className="container col-md-4 mb-0 text-muted d-flex justify-content-start">
          &copy; 2022 Beyra, Inc
        </p>
        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none text-muted"
        >
          <img src={fakelogo} alt="logo" className="opacity-50" />
          Iron Money
        </Link>
        <ul className="container nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-muted">
              About
            </Link>
          </li> */}
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
