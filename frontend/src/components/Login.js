import React from "react";
import { get, post } from "../http/service";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = (e) => {
    e.preventDefault();
    post("/auth/login", {
      username,
      password,
    })
      .then((results) => {
        console.log("You are logged in!!!", results.data);

        localStorage.setItem("token", results.data);

        // let thing = localStorage.getItem("token");
        // console.log("This was stored in our localStorage", thing);
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log in</button>
      </form>
      <button onClick={checkIfLoggedIn}>See if you are logged in</button>
      <button onClick={checkToken}>check if token is stored</button>
    </div>
  );
};

export default Login;
