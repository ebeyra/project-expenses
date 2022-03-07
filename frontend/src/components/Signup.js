import React from "react";
import fakelogo from "../assets/images/fakelogo.svg";
import { get, post } from "../http/service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    post("/auth/signup", {
      username,
      password,
      firstName,
      lastName,
    })
      .then((results) => {
        localStorage.setItem("token", results.data);
        navigate("/hub");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center p-5">
      <form style={{ width: "450px" }} onSubmit={signUpUser}>
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
                    className="bi bi-person-fill"
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
                onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <button className="w-100 btn btn-lg btn-success mt-3" type="submit">
          Sign Up
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
      </form>
    </div>
  );
};

export default Signup;
