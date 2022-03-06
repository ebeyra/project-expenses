import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="py-1 bg-dark">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-light">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-light">
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-light">
              About
            </Link>
          </li>
        </ul>
        <p className="text-center text-light">&copy; 2022 Beyra, Inc</p>
      </footer>
    </div>
  );
};

export default Footer;
