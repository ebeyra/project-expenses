import React from "react";
import { post, get } from "../http/service";
import { Link } from "react-router-dom";
import { logout } from "./utility/globalfunctions";

const Transactions = () => {
  const [userData, setUserData] = React.useState("");

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
    return (
      <tr key={transactions._id}>
        <td className="align-middle">{transactions.date}</td>
        <td className="align-middle">{transactions.category}</td>
        <td className="align-middle">{transactions.amount}</td>
        <td className="align-middle">{transactions.memo}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            style={{ fontSize: "13px" }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-2"
            style={{ fontSize: "13px" }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    // <div className="container-fluid">
    //   <div className="row flex-nowrap">
    //     <div className="col-auto col-md-auto col-xl-auto px-sm-2 px-0 bg-success full-screen">
    //       <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
    //         <ul
    //           className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
    //           id="menu"
    //         >
    //           {/* <li className="nav-item">
    //                     <a href="#" className="nav-link align-middle px-0">
    //                         <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline text-white">Home</span>
    //                     </a>
    //                 </li> */}
    //           <li>
    //             <Link to="/hub" className="nav-link px-0 align-middle">
    //               <i className="fs-4 bi-speedometer2 text-white"></i>{" "}
    //               <span className="ms-1 d-none d-sm-inline text-white">
    //                 Summary
    //               </span>{" "}
    //             </Link>
    //           </li>
    //           <li>
    //             <a
    //               href="#submenu2"
    //               data-bs-toggle="collapse"
    //               className="nav-link px-0 align-middle "
    //             >
    //               <i className="fs-4 bi-journal-text text-white"></i>{" "}
    //               <span className="ms-1 d-none d-sm-inline text-white">
    //                 Expenses
    //               </span>
    //             </a>
    //             <ul
    //               className="collapse nav flex-column ms-1"
    //               id="submenu2"
    //               data-bs-parent="#menu"
    //             >
    //               <li className="w-100">
    //                 <Link to="/budget" className="nav-link px-0 text-end">
    //                   {" "}
    //                   <span className="d-none d-sm-inline text-white">
    //                     Budget
    //                   </span>{" "}
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link to="/transactions" className="nav-link px-0 text-end">
    //                   {" "}
    //                   <span className="d-none d-sm-inline text-white">
    //                     Transactions
    //                   </span>{" "}
    //                 </Link>
    //               </li>
    //             </ul>
    //           </li>
    //           <li>
    //             <Link to="/profile" className="nav-link px-0 align-middle">
    //               <i className="fs-4 bi-person-lines-fill text-white"></i>{" "}
    //               <span className="ms-1 d-none d-sm-inline text-white">
    //                 Profile
    //               </span>{" "}
    //             </Link>
    //           </li>
    //         </ul>
    //         <hr />
    //         <div className="dropdown pb-4">
    //           <a
    //             href="#"
    //             className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
    //             id="dropdownUser1"
    //             data-bs-toggle="dropdown"
    //           >
    //             <i className="fs-4 bi-person-circle text-white me-2"></i>
    //             <span className="d-none d-sm-inline mx-1">Name</span>
    //           </a>
    //           <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
    //             <li>
    //               <a className="dropdown-item" href="#" onClick={logout}>
    //                 Sign out
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
        <div className="col py-3">
          <div className="container">
            <div className="row">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
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
    //   </div>
    // </div>
  );
};

export default Transactions;
