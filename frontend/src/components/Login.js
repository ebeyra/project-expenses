import React from "react";
import { get, post } from "../http/service";
import fakelogo from "../assets/images/fakelogo.svg";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("token", results.data);
        navigate("/expenses");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const checkToken = () => {
    let thing = localStorage.getItem("token");
    console.log("This was stored in our localStorage", thing);
  };

  const checkIfLoggedIn = (e) => {
    e.preventDefault();
    get("/users/profile")
      .then((results) => {
        console.log("log in?", results.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log("You have logged out");
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

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-success" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
        </form>
        <button onClick={checkIfLoggedIn}>See if you are logged in</button>
        <button onClick={checkToken}>check if token is stored</button>
        <button onClick={logout}>Logout</button>
      </main>
    </div>
  );
};

export default Login;
