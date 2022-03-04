import React from "react";
import fakelogo from "../public/assets/images/fakelogo.svg";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  return (
    <div className="container d-flex justify-content-center p-5">
      <form style={{ width: "450px" }}>
        <img
          className="mb-4"
          src={fakelogo}
          alt="logo"
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Create an Account</h1>
        <div className="form-row">
          <div className="col-md-4 mb-3 w-100 text-start">
            <label htmlFor="validationDefaultUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="24"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="validationDefaultUsername"
                placeholder="Username"
                value={username}
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3 w-100 text-start">
            <label htmlFor="validationDefault03">Password</label>
            <input
              type="password"
              className="form-control"
              id="validationDefault03"
              placeholder="Password"
              value={password}
              required
            />
          </div>
          <div className="col-md-4 mb-3 w-100 text-start">
            <label htmlFor="validationDefault01">First name</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault01"
              placeholder="First name"
              value={firstName}
            />
          </div>
          <div className="col-md-4 mb-3 w-100 text-start">
            <label htmlFor="validationDefault02">Last name</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault02"
              placeholder="Last name"
              value={lastName}
            />
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
