import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "./utility/globalfunctions";
import { post, get } from "../http/service";

const EditBudget = () => {
  const [userBudget, setUserBudget] = React.useState("");
  const [userInfo, setUserInfo] = React.useState("");
  const [income, setIncome] = React.useState("");
  const [auto, setAuto] = React.useState("");
  const [creditCard, setCreditCard] = React.useState("");
  const [entertainment, setEntertainment] = React.useState("");
  const [groceries, setGroceries] = React.useState("");
  const [internet, setInternet] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [rent, setRent] = React.useState("");
  const [streaming, setStreaming] = React.useState("");
  const [utilities, setUtilities] = React.useState("");
  const [other, setOther] = React.useState("");

  const navigate = useNavigate();
  const { budgetId } = useParams();

  React.useEffect(() => {
    get(`/expenses/budgets/${budgetId}`)
      .then((results) => {
        console.log(results);
        setUserBudget(results?.data?.foundBudget);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

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

  const editBudget = (e) => {
    e.preventDefault();
    // let filteredObject = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value));
    post(`/expenses/budgets/${budgetId}/edit`, {
      income,
      auto,
      creditCard,
      entertainment,
      groceries,
      internet,
      mobile,
      rent,
      streaming,
      utilities,
      other,
    })
      .then((results) => {
        console.log("Budget updated: ", results);
        navigate("/hub");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    // Sidebar
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
              {/* <li>
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
                    <Link
                      to="/budget/create"
                      className="nav-link px-0 text-end"
                    >
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
              </li> */}
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
        {/* Page content start */}
        <div>
          <div
            className="container-xl px-4 mt-3"
            style={{ maxWidth: "1100px" }}
          >
            <div className="card">
              <div className="card-header">
                <h2>Updating Your Budget</h2>
              </div>
              <div className="card-body">
                <p>
                  New changes to keep track of? Update your budget below to stay
                  current.
                </p>
              </div>
            </div>
          </div>
          {/* Form container start */}
          <div
            className="container align-center my-4 border rounded border-success"
            style={{ maxWidth: "900px" }}
          >
            <div className="row">
              <form
                className="text-start my-5 d-flex align-items-center justify-content-evenly"
                onSubmit={editBudget}
              >
                <div className="">
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="monthly-income">Monthly Income</label>
                    <input
                      type="number"
                      className="form-control"
                      id="monthly-income"
                      placeholder={userBudget?.income}
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="auto">Auto/Transportation</label>
                    <input
                      type="number"
                      className="form-control"
                      id="auto"
                      placeholder={userBudget?.auto}
                      value={auto}
                      onChange={(e) => setAuto(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="credit-card">Credit Card</label>
                    <input
                      type="number"
                      className="form-control"
                      id="credit-card"
                      placeholder={userBudget?.creditCard}
                      value={creditCard}
                      onChange={(e) => setCreditCard(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="entertainment">Entertainment</label>
                    <input
                      type="number"
                      className="form-control"
                      id="entertainment"
                      placeholder={userBudget?.entertainment}
                      value={entertainment}
                      onChange={(e) => setEntertainment(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="groceries">Groceries</label>
                    <input
                      type="number"
                      className="form-control"
                      id="groceries"
                      placeholder={userBudget?.groceries}
                      value={groceries}
                      onChange={(e) => setGroceries(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="internet">Internet</label>
                    <input
                      type="number"
                      className="form-control"
                      id="internet"
                      placeholder={userBudget?.internet}
                      value={internet}
                      onChange={(e) => setInternet(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-column">
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      placeholder={userBudget?.mobile}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="rent">Rent/Mortgage</label>
                    <input
                      type="number"
                      className="form-control"
                      id="rent"
                      placeholder={userBudget?.rent}
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="streaming">Streaming</label>
                    <input
                      type="number"
                      className="form-control"
                      id="streaming"
                      placeholder={userBudget?.streaming}
                      value={streaming}
                      onChange={(e) => setStreaming(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="utilities">Utilities</label>
                    <input
                      type="number"
                      className="form-control"
                      id="utilities"
                      placeholder={userBudget?.utilities}
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="other">Other</label>
                    <input
                      type="number"
                      className="form-control"
                      id="other"
                      placeholder={userBudget?.other}
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success my-3">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBudget;
