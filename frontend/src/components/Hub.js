import React from "react";
import { Link } from "react-router-dom";
import Budget from "./Budget";
import Transactions from "./Transactions";
import { logout } from "./utility/globalfunctions";
import { post, get } from "../http/service";
import { useNavigate } from "react-router-dom";

const Hub = () => {
  const [userInfo, setUserInfo] = React.useState("");
  const navigate = useNavigate("");

  React.useEffect(() => {
    get("/users/profile")
      .then((results) => {
        setUserInfo(results.data.foundUser);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

  return (
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
                <a
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle "
                >
                  <i className="fs-4 bi-journal-text text-white"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-white">
                    Expenses
                  </span>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/budget/create" className="nav-link px-0 text-end">
                      {" "}
                      <span className="d-none d-sm-inline text-white">
                        Budget
                      </span>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/transactions/create"
                      className="nav-link px-0 text-end"
                    >
                      {" "}
                      <span className="d-none d-sm-inline text-white">
                        Transactions
                      </span>{" "}
                    </Link>
                  </li>
                </ul>
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
        <div className="col py-3">
          <Budget />
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default Hub;
