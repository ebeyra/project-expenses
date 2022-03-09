import React from "react";
import { get, post } from "../http/service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "./utility/globalfunctions";

const Profile = () => {
  const [userInfo, setUserInfo] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate("");

  React.useEffect(() => {
    get("/users/profile")
      .then((results) => {
        setUserInfo(results?.data?.foundUser);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

  const updateUser = (e) => {
    e.preventDefault();
    // let filteredObject = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value));
    post(`/users/profile/edit`, {
      username,
      password,
      firstName,
      lastName,
      email,
    })
      .then((results) => {
        console.log("User updated: ", results);
        navigate("/hub");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    post(`/users/profile/delete`)
      .then((results) => {
        console.log("Account deleted: ", results);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    // Sidebar //
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-auto col-xl-auto px-sm-2 px-0 bg-success full-screen">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link to="/hub" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-speedometer2 text-white"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-white">
                    Summary
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-person-lines-fill text-white"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-white">
                    Profile
                  </span>{" "}
                </Link>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <a
                href="#none"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
              >
                <i className="fs-4 bi-person-circle text-white me-2"></i>
                <span className="d-none d-sm-inline mx-1">
                  {userInfo?.firstName ? userInfo.firstName : "Name"}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <Link to="/" className="dropdown-item" onClick={logout}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Form container start */}
        <div className="col py-3">
          <div className="container px-4 mt-4" style={{ maxWidth: "800px" }}>
            <div className="row">
              <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  <form onSubmit={updateUser}>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          First name
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder={
                            userInfo?.firstName
                              ? userInfo.firstName
                              : "First Name"
                          }
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Last name
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          placeholder={
                            userInfo?.lastName ? userInfo.lastName : "Last Name"
                          }
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder={userInfo?.email ? userInfo.email : "Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Username
                      </label>
                      <input
                        className="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder={
                          userInfo?.username ? userInfo.username : "Username"
                        }
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputPassword">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-outline-success mt-3 mb-3 me-2"
                      type="submit"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={deleteAccount}
                      className="btn btn-outline-danger mt-3 mb-3 ms-2 text-decoration-none"
                    >
                      Delete Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
