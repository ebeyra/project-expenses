import React from "react";
import { post } from "../http/service";
import fakelogo from "../assets/images/fakelogo.svg";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    post("/auth/login", {
      username,
      password,
    })
      .then((results) => {
        console.log(results);
        localStorage.setItem("token", results.data);
        navigate("/hub");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <main className="form-signin justify-center" style={{ minWidth: "30%" }}>
        <form className="w-200" onSubmit={loginUser}>
          <img
            className="mb-4"
            src={fakelogo}
            alt="logo"
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="mt-2">
            <Link to="/signup">
              {" "}
              New to Iron Money? Click here to sign up.{" "}
            </Link>
          </div>
          <button className="w-100 btn btn-lg btn-success mt-3" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
