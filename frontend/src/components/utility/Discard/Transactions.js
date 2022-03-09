import React from "react";
import { post, get } from "../http/service";
import { Link, useNavigate } from "react-router-dom";
import { categoryEnum } from "./utility/globalfunctions";

const Transactions = () => {
  const [userData, setUserData] = React.useState("");
  const [sortedTransactions, setSortedTransactions] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [memo, setMemo] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    get("/expenses")
      .then((results) => {
        setUserData(results?.data);
        let sortArray = [...results?.data?.foundTransactions];
        let sortedList = sortArray.sort(
          (a, b) => b.date.substring(8, 10) - a.date.substring(8, 10)
        );
        setSortedTransactions(sortedList);
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
          let sortArray = [...results?.data?.foundTransactions];
          let sortedList = sortArray.sort(
            (a, b) => b.date.substring(8, 10) - a.date.substring(8, 10)
          );
          setSortedTransactions(sortedList);
          navigate("/hub");
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const categoryList = categoryEnum.map((eachCategory) => {
    return (
      <option value={eachCategory} key={eachCategory}>
        {eachCategory}
      </option>
    );
  });

  const transactionList = sortedTransactions?.map((transactions) => {
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
              let sortArray = [...results?.data?.foundTransactions];
              let sortedList = sortArray.sort(
                (a, b) => b.date.substring(8, 10) - a.date.substring(8, 10)
              );
              setSortedTransactions(sortedList);
              navigate("/hub");
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

  return (
    <div>
      <div className="container">
        <div className="row">
          <form
            className="row gx-3 mt-4 align-items-center justify-content-start text-start col-12"
            onSubmit={createTransaction}
          >
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
      <div className="col py-3 overflow-auto mt-3" style={{ height: "300px" }}>
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
  );
};

export default Transactions;
