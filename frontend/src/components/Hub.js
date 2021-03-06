import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./utility/globalfunctions";
import { get, post } from "../http/service";
import { categoryEnum } from "./utility/globalfunctions";

const Hub = () => {
  // Hooks for database info: user, transaction, budget

  const [userInfo, setUserInfo] = React.useState("");
  const [userBudget, setUserBudget] = React.useState([]);
  const [userData, setUserData] = React.useState("");
  const [data, setData] = React.useState("");
  const [sortedTransactions, setSortedTransactions] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(sortedTransactions);
  const navigate = useNavigate("");

  // Get back-end data

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

  React.useEffect(() => {
    get("/expenses")
      .then((results) => {
        setUserBudget(results?.data?.foundBudget[0]);
        setData(results?.data);
        setUserData(results?.data);
        let sortArray = [...results?.data?.foundTransactions];
        let sortedList = sortArray.sort(
          (a, b) => b.date.substring(8, 10) - a.date.substring(8, 10)
        );
        setSortedTransactions(sortedList);
        setSearchResults(sortedList);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const createTransaction = (e) => {
    e.preventDefault();
    post("/expenses/new-transaction", {
      date,
      category,
      amount,
      memo,
    })
      .then((results) => {
        console.log("Transaction created: ", results);
        get("/expenses").then((results) => {
          setUserBudget(results?.data?.foundBudget[0]);
          setData(results?.data);
          setUserData(results?.data);
          let sortArray = [...results?.data?.foundTransactions];
          let sortedList = sortArray.sort(
            (a, b) => b.date.substring(8, 10) - a.date.substring(8, 10)
          );
          setSortedTransactions(sortedList);
          setSearchResults(sortedList);
          navigate("/hub");
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  // Imported function to render <select option>

  const categoryList = categoryEnum.map((eachCategory) => {
    return (
      <option value={eachCategory} key={eachCategory}>
        {eachCategory}
      </option>
    );
  });

  // Search bar logic

  let filteredTransactions = (input) => {
    let transactionArray = [...sortedTransactions];
    let searchResults = transactionArray.filter((transaction) => {
      return transaction.memo.toLowerCase().includes(input.toLowerCase());
    });
    // setSortedTransactions(searchResults);
    setSearchResults(searchResults);
  };

  // Sort transactions by date

  const transactionList = searchResults?.map((transactions) => {
    const deleteTransaction = (e) => {
      e.preventDefault();
      post(`/expenses/transactions/${transactions._id}/delete`).then(
        (results) => {
          console.log(
            "Transaction deleted: ",
            results.data.transactionToRemove
          );
          get("/expenses")
            .then((results) => {
              setUserBudget(results?.data?.foundBudget[0]);
              setData(results.data);
              setUserData(results?.data);
              let sortArray = [...results?.data?.foundTransactions];
              let sortedList = sortArray.sort(
                (a, b) => b.date.substring(8, 10) - a.date.substring(8, 10)
              );
              setSortedTransactions(sortedList);
              setSearchResults(sortedList);
            })
            .catch((err) => {
              console.error(err.message);
            });
        }
      );
    };

    return (
      <tr key={transactions._id}>
        <td className="align-middle">{transactions.date}</td>
        <td className="align-middle">{transactions.category}</td>
        <td className="align-middle">${transactions.amount}</td>
        <td className="align-middle">{transactions.memo}</td>
        <td>
          <Link
            to={`/transactions/${transactions._id}`}
            className="btn btn-outline-success me-2 text-decoration-none"
            style={{ fontSize: "13px" }}
          >
            Edit
          </Link>
          <button
            onClick={deleteTransaction}
            className="btn btn-outline-danger me-2 text-decoration-none"
            style={{ fontSize: "13px" }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  // Budget math

  const totalSpendingBudget =
    userBudget.auto +
    userBudget.creditCard +
    userBudget.entertainment +
    userBudget.groceries +
    userBudget.internet +
    userBudget.mobile +
    userBudget.rent +
    userBudget.streaming +
    userBudget.utilities +
    userBudget.other;

  // Spend math

  const calculateSpend = (data) => {
    let sum = 0;
    for (let i = 0; i < data?.length; i++) {
      sum += data[i].amount;
    }
    return sum;
  };

  let autoSpend = Math.floor(calculateSpend(data?.autoTransactions));
  let creditCardSpend = Math.floor(
    calculateSpend(data?.creditCardTransactions)
  );
  let entertainmentSpend = Math.floor(
    calculateSpend(data?.entertainmentTransactions)
  );
  let groceriesSpend = Math.floor(calculateSpend(data?.groceriesTransactions));
  let internetSpend = Math.floor(calculateSpend(data?.internetTransactions));
  let mobileSpend = Math.floor(calculateSpend(data?.mobileTransactions));
  let rentSpend = Math.floor(calculateSpend(data?.rentTransactions));
  let streamingSpend = Math.floor(calculateSpend(data?.streamingTransactions));
  let utilitiesSpend = Math.floor(calculateSpend(data?.utilitiesTransactions));
  let otherSpend = Math.floor(calculateSpend(data?.otherTransactions));
  let refunds = Math.floor(calculateSpend(data?.refundTransactions));

  let totalSpend =
    autoSpend +
    creditCardSpend +
    entertainmentSpend +
    groceriesSpend +
    internetSpend +
    mobileSpend +
    rentSpend +
    streamingSpend +
    utilitiesSpend +
    otherSpend -
    refunds;

  // Progress bar math

  let autoProgress = Math.floor((autoSpend / userBudget?.auto) * 100);
  let creditCardProgress = Math.floor(
    (creditCardSpend / userBudget?.creditCard) * 100
  );
  let entertainmentProgress = Math.floor(
    (entertainmentSpend / userBudget?.entertainment) * 100
  );
  let groceriesProgress = Math.floor(
    (groceriesSpend / userBudget?.groceries) * 100
  );
  let internetProgress = Math.floor(
    (internetSpend / userBudget?.internet) * 100
  );
  let mobileProgress = Math.floor((mobileSpend / userBudget?.mobile) * 100);
  let rentProgress = Math.floor((rentSpend / userBudget?.rent) * 100);
  let streamingProgress = Math.floor(
    (streamingSpend / userBudget?.streaming) * 100
  );
  let utilitiesProgress = Math.floor(
    (utilitiesSpend / userBudget?.utilities) * 100
  );
  let otherProgress = Math.floor((otherSpend / userBudget?.other) * 100);

  // API data

  // Hard coded data for browser testing
  // https://image-charts.com/chart?cht=bvs&chs=700x500&chd=t:50,100,300,80,20,100,90,200,120&chds=a&chf=b0,lg,0,198754,1&chtt=Category%20Spend&chxl=1:|Auto|Credit|Entertainment|Groceries|Internet|Mobile|Streaming|Utilities|Other&chan&chxr=0,0,800&chxt=y,x

  const chartData = {
    method: "GET",
    url: `https://image-charts.com/chart?cht=bvs&chs=600x350&chd=t:${autoSpend},${creditCardSpend},${entertainmentSpend},${groceriesSpend},${internetSpend},${mobileSpend},${streamingSpend},${utilitiesSpend},${otherSpend}&chds=a&chf=b0,lg,0,198754,1&chtt=Category%20Spend&chxl=1:|Auto|Credit|Entertain|Groceries|Internet|Mobile|Streaming|Utilities|Other&chan&chxr=0,0,800&chxt=y,x`,
  };

  return (
    //         //
    //         //
    // SIDEBAR //
    //         //
    //         //
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
        {/*                    */}
        {/*                    */}
        {/* PAGE CONTENT START */}
        {/*                    */}
        {/*                    */}
        <div className="col py-3">
          <div className=" d-flex flex-row">
            <div className="col-md-6">
              {/*                    */}
              {/*                    */}
              {/*   BUDGET SECTION   */}
              {/*                    */}
              {/*                    */}
              <div className="container d-flex flex-row">
                <div className="container col-8">
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: autoProgress + "%",
                      }}
                      value="auto"
                      key="auto"
                    >
                      <span
                        className={
                          autoProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Auto {autoProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: creditCardProgress + "%",
                      }}
                      value="creditCard"
                      key="creditCard"
                    >
                      <span
                        className={
                          creditCardProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25 bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Credit Card {creditCardProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: entertainmentProgress + "%",
                      }}
                      value="entertainment"
                      key="entertainment"
                    >
                      <span
                        className={
                          entertainmentProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Entertainment {entertainmentProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: groceriesProgress + "%",
                      }}
                      value="groceries"
                      key="groceries"
                    >
                      <span
                        className={
                          groceriesProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Groceries {groceriesProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: internetProgress + "%",
                      }}
                      value="internet"
                      key="internet"
                    >
                      <span
                        className={
                          internetProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Internet {internetProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: mobileProgress + "%",
                      }}
                      value="mobile"
                      key="mobile"
                    >
                      <span
                        className={
                          mobileProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Mobile {mobileProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: rentProgress + "%",
                      }}
                      value="rent"
                      key="rent"
                    >
                      <span
                        className={
                          rentProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Mortgage/Rent {rentProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: streamingProgress + "%",
                      }}
                      value="streaming"
                      key="streaming"
                    >
                      <span
                        className={
                          streamingProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Streaming {streamingProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: utilitiesProgress + "%",
                      }}
                      value="utilities"
                      key="utilities"
                    >
                      <span
                        className={
                          utilitiesProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Utilities {utilitiesProgress + "%"}
                      </span>
                    </div>
                  </div>
                  <div className="progress my-1" style={{ height: "30px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated text-dark"
                      role="progressbar"
                      style={{
                        backgroundColor: "#e0b646",
                        width: otherProgress + "%",
                      }}
                      value="other"
                      key="other"
                    >
                      <span
                        className={
                          otherProgress > 99
                            ? "text-danger fw-bold bg-light bg-opacity-25"
                            : "text-dark"
                        }
                      >
                        Other {otherProgress + "%"}
                      </span>
                    </div>
                  </div>
                </div>
                {/*                      */}
                {/*                      */}
                {/* RIGHT SIDE OF BUDGET */}
                {/*                      */}
                {/*                      */}
                <div className="d-flex flex-column justify-content-center">
                  <div className="d-flex justify-content-evenly">
                    <div
                      className="card border-primary mb-3 ms-5"
                      style={{ width: "6rem", height: "6rem" }}
                    >
                      <div className="card-header">Income</div>
                      <div className="card-body text-primary">
                        <h6 className="card-title">
                          <span>${userBudget?.income}</span>
                        </h6>
                      </div>
                    </div>
                    <div
                      className="card border-warning mb-3 ms-3"
                      style={{ width: "6rem", height: "6rem" }}
                    >
                      <div className="card-header">Budget</div>
                      <div className="card-body">
                        <h6 className="card-title">
                          <span
                            className={
                              totalSpendingBudget > userBudget?.income
                                ? "text-danger"
                                : "text-dark"
                            }
                          >
                            ${totalSpendingBudget}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div
                      className="card border-success mb-3 ms-5"
                      style={{ width: "6rem", height: "6rem" }}
                    >
                      <div className="card-header">Deposit</div>
                      <div className="card-body text-primary">
                        <h6 className="card-title">
                          <span
                            className={
                              refunds > 0 ? "text-primary" : "text-dark"
                            }
                          >
                            ${refunds}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div
                      className="card border-danger mb-3 ms-3"
                      style={{ width: "6rem", height: "6rem" }}
                    >
                      <div className="card-header">Spent</div>
                      <div className="card-body text-primary">
                        <h6 className="card-title">
                          <span
                            className={
                              totalSpend > totalSpendingBudget
                                ? "text-danger"
                                : "text-dark"
                            }
                          >
                            ${totalSpend}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/budget/${userBudget?._id}`}
                      className="btn btn-outline-success mx-auto text-decoration-none ms-5"
                      style={{ fontSize: "13px" }}
                    >
                      Edit Budget
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/*                         */}
            {/*                         */}
            {/*        API SECTION      */}
            {/*                         */}
            {/*                         */}
            <div className="col-sm-6">
              <img
                src={chartData?.url}
                alt="chart data"
                className="col-10 mt-2"
                style={{ height: "330px", width: "650px" }}
              />
            </div>
          </div>
          <div>
            {/*                         */}
            {/*                         */}
            {/*   TRANSACTION SECTION   */}
            {/*                         */}
            {/*                         */}
            <div>
              <div className="container mt-3">
                <div className="row">
                  <form
                    className="row gx-3 mt-4 align-items-center justify-content-start text-start col-12"
                    onSubmit={createTransaction}
                  >
                    {/*             */}
                    {/*             */}
                    {/*    SEARCH   */}
                    {/*             */}
                    {/*             */}
                    <div className="col-lg-1">
                      <label htmlFor="transaction-search">Search</label>
                      <input
                        className="form-control"
                        type="text"
                        id="transaction-search"
                        placeholder="Memos"
                        // value={""}
                        onChange={(e) => {
                          filteredTransactions(e.target.value);
                        }}
                      />
                    </div>
                    <div className="dividerBar mx-3" style={{ width: "10px" }}>
                      |
                    </div>
                    {/*                 */}
                    {/*                 */}
                    {/*   Transactions  */}
                    {/*                 */}
                    {/*                 */}
                    <div className="col-lg-2">
                      <label htmlFor="transaction-date">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="transaction-date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-lg-2">
                      <label htmlFor="transaction-category">Category</label>
                      <select
                        className="form-select"
                        id="transaction-category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="Other">Choose...</option>
                        {categoryList}
                      </select>
                    </div>
                    <div className="col-lg-2">
                      <label htmlFor="transaction-amount">Amount</label>
                      <div className="input-group">
                        <div className="input-group-text">$</div>
                        <input
                          type="number"
                          className="form-control"
                          id="transaction-amount"
                          placeholder="Amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <label htmlFor="transaction-memo">Memo</label>
                      <input
                        className="form-control"
                        type="text"
                        id="transaction-memo"
                        placeholder="Note"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                      />
                    </div>
                    <div className="col-xl-2" style={{ marginTop: "auto" }}>
                      <button type="submit" className="btn btn-success">
                        Add Transaction
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="col py-3 overflow-auto mt-3"
                style={{ height: "300px" }}
              >
                <div className="container">
                  <div className="row">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th style={{ minWidth: "120px" }}>Date</th>
                          <th>Category</th>
                          <th>Amount</th>
                          <th style={{ minWidth: "120px" }}>Memo</th>
                          <th style={{ minWidth: "150px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>{transactionList}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;
