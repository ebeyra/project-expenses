import React from "react";
import forbidden from "../assets/images/forbidden.svg";

const NoAuth = () => {
  return (
    <div className="container my-auto">
      <div className="col-10 col-sm-8 col-lg-6 mx-auto align-baseline">
        <img
          src={forbidden}
          className="d-block mx-lg-auto img-fluid"
          alt="main pic"
          width="700"
          height="500"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default NoAuth;
