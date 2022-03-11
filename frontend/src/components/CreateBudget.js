import React from "react";
import { useNavigate } from "react-router-dom";
import { post, get } from "../http/service";
import { Link } from "react-router-dom";
import { logout } from "./utility/globalfunctions";
import screenshotH1 from "../assets/images/screenshotH1.png";

const CreateBudget = () => {
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

  const createBudget = (e) => {
    e.preventDefault();
    post("/expenses/new-budget", {
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
        console.log("Budget created: ", results);
        navigate("/transactions/create");
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
                {/* <Link
                  to="/hub"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 text-white"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-white">
                    Summary
                  </span>{" "}
                </Link> */}
              </li>
              <li>
                {/* <Link
                  to="/profile"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fs-4 bi-person-lines-fill text-white"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-white">
                    Profile
                  </span>{" "}
                </Link> */}
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
        <div className="container col">
          <h3 className="mt-5">Start With a Budget</h3>
          <p className="w-50 mx-auto">
            Use our template guide below to start tracking your spending and
            stay in control. Not sure what amount you want to set? You can come
            back and edit your budget any time.
          </p>
          {/* Form container start */}
          <div
            className="container col align-center my-3 border rounded d-flex py-5 justify-content-evenly"
            style={{ maxWidth: "1000px" }}
          >
            <div className="col-lg-4 offset-lg-1 overflow-hidden shadow-lg ms-0">
              <img
                className="rounded-lg-3"
                src={screenshotH1}
                alt="example"
                style={{ width: "839px" }}
              />
            </div>
            <div className="row">
              <form
                className="text-start my-5 d-flex align-items-center justify-content-evenly"
                onSubmit={createBudget}
              >
                <div className="">
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="monthly-income">Monthly Income</label>
                    <input
                      type="number"
                      className="form-control"
                      id="monthly-income"
                      placeholder="Income"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
                      value={internet}
                      onChange={(e) => setInternet(e.target.value)}
                    />
                  </div>
                </div>
                <div className="ms-5">
                  <div className="form-group col-sm-12 my-2">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
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
                      placeholder="Enter an estimate"
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success my-3 ms-5">
                    Create Budget
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

export default CreateBudget;
