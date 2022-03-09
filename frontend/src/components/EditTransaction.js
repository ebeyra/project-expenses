import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "./utility/globalfunctions";
import { post, get } from "../http/service";
import { categoryList } from "./utility/globalfunctions";

const EditTransaction = () => {
  const [userInfo, setUserInfo] = React.useState("");
  const [date, setDate] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [product, setProduct] = React.useState("");

  const navigate = useNavigate();
  const { transactionId } = useParams();

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

  const editTransaction = (e) => {
    e.preventDefault();
    // let filteredObject = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value));
    post(`/expenses/transactions/${transactionId}/edit`, {
      date,
      category,
      amount,
      memo,
      product,
    })
      .then((results) => {
        console.log("Transaction updated: ", results);
        navigate("/hub");
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
        {/* Form container start */}
        <div className="col py-3">
          <div className="container w-75 mt-4">
            <div className="row">
              <form
                className="row gx-3 gy-2 align-items-center justify-content-center text-start col-12"
                onSubmit={editTransaction}
              >
                <h4>Edit Transaction</h4>
                <div className="col-lg-2">
                  <label className="" htmlFor="transaction-date">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="transaction-date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="col-lg-2">
                  <label className="" htmlFor="transaction-category">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="transaction-category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Other">Choose...</option>
                    {categoryList}
                  </select>
                </div>
                <div className="col-lg-2">
                  <label className="" htmlFor="transaction-amount">
                    Amount
                  </label>
                  <div className="input-group">
                    <div className="input-group-text">$</div>
                    <input
                      type="number"
                      className="form-control"
                      id="transaction-amount"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-2">
                  <label className="" htmlFor="transaction-memo">
                    Memo
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="transaction-memo"
                    placeholder="Note"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </div>

                <div className="col-lg-2">
                  <label className="" htmlFor="product-search">
                    Product Search
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="product-search"
                    placeholder="Optional"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </div>

                <div className="col-lg-2" style={{ marginTop: "auto" }}>
                  <button type="submit" className="btn btn-success">
                    Submit
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

export default EditTransaction;
