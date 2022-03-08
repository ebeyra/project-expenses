import React from "react";
import { post, get } from "../http/service";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./utility/globalfunctions";

const Transactions = () => {
  const [userData, setUserData] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    get("/expenses")
      .then((results) => {
        setUserData(results.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const transactionList = userData.foundTransactions?.map((transactions) => {
    const deleteTransaction = (e) => {
      e.preventDefault();
      let filteredTransactions = userData.foundTransactions.filter((item) => {
        return item._id !== transactions._id;
      });
      post(`/expenses/transactions/${transactions._id}/delete`)
        .then((results) => {
          console.log(
            "Transaction deleted: ",
            results.data.transactionToRemove
          );
          setUserData({ ...userData, foundTransactions: filteredTransactions });
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    return (
      <tr key={transactions._id}>
        <td className="align-middle">{transactions.date}</td>
        <td className="align-middle">{transactions.category}</td>
        <td className="align-middle">${transactions.amount}</td>
        <td className="align-middle">{transactions.memo}</td>
        <td className="align-middle">{transactions.product}</td>
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
    <div className="col py-3">
      <div className="container">
        <div className="row">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ minWidth: "120px" }}>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th style={{ minWidth: "120px" }}>Memo</th>
                <th style={{ minWidth: "120px" }}>Product</th>
                <th style={{ minWidth: "150px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{transactionList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
