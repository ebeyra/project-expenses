import React from "react";
import { useNavigate } from "react-router-dom";
import { post, get } from "../http/service";
import { Link } from "react-router-dom";
import { logout } from "./utility/globalfunctions";

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
        setUserInfo(results.data.foundUser);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

  return (
    <div>
      <div className="container-xl px-4 mt-3" style={{ maxWidth: "1100px" }}>
        <div className="card">
          <div className="card-header">
            <h2>Getting Started With a Budget</h2>
          </div>
          <div className="card-body">
            <p>
              Use our template guide below to start tracking your spending and
              stay in control.
            </p>
          </div>
        </div>
      </div>
      <div
        className="container align-center my-4 border rounded border-success"
        style={{ maxWidth: "900px" }}
      >
        <div className="row">
          <form className="text-start my-5 d-flex align-items-center justify-content-evenly">
            <div className="">
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="monthly-income">Monthly Income</label>
                <input
                  type="number"
                  className="form-control"
                  id="monthly-income"
                  placeholder="Income"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="auto">Auto/Transportation</label>
                <input
                  type="number"
                  className="form-control"
                  id="auto"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="credit-card">Credit Card</label>
                <input
                  type="number"
                  className="form-control"
                  id="credit-card"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="entertainment">Entertainment</label>
                <input
                  type="number"
                  className="form-control"
                  id="entertainment"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="groceries">Groceries</label>
                <input
                  type="number"
                  className="form-control"
                  id="groceries"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="internet">Internet</label>
                <input
                  type="number"
                  className="form-control"
                  id="internet"
                  placeholder="Enter an estimate"
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
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="rent">Rent/Mortgage</label>
                <input
                  type="number"
                  className="form-control"
                  id="rent"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="streaming">Streaming</label>
                <input
                  type="number"
                  className="form-control"
                  id="streaming"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="utilities">Utilities</label>
                <input
                  type="number"
                  className="form-control"
                  id="utilities"
                  placeholder="Enter an estimate"
                />
              </div>
              <div className="form-group col-sm-12 my-2">
                <label htmlFor="other">Other</label>
                <input
                  type="number"
                  className="form-control"
                  id="other"
                  placeholder="Enter an estimate"
                />
              </div>
              <button type="submit" className="btn btn-success my-3">
                Create Budget
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBudget;
