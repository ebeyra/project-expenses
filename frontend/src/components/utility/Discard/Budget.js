import React from "react";
import { get } from "../http/service";
import { Link, useNavigate } from "react-router-dom";

const Budget = () => {
  const [userBudget, setUserBudget] = React.useState("");
  const [data, setData] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    get("/expenses")
      .then((results) => {
        setUserBudget(results?.data?.foundBudget[0]);
        setData(results.data);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

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

  // Spending math

  const autoSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.autoTransactions?.length; i++) {
      sum += data.autoTransactions[i].amount;
    }
    return sum;
  };
  let autoProgress = Math.floor((autoSpend() / userBudget?.auto) * 100);

  const creditCardSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.creditCardTransactions?.length; i++) {
      sum += data.creditCardTransactions[i].amount;
    }
    return sum;
  };
  let creditCardProgress = Math.floor(
    (creditCardSpend() / userBudget?.creditCard) * 100
  );

  const entertainmentSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.entertainmentTransactions?.length; i++) {
      sum += data.entertainmentTransactions[i].amount;
    }
    return sum;
  };
  let entertainmentProgress = Math.floor(
    (entertainmentSpend() / userBudget?.entertainment) * 100
  );

  const groceriesSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.groceriesTransactions?.length; i++) {
      sum += data.groceriesTransactions[i].amount;
    }
    return sum;
  };
  let groceriesProgress = Math.floor(
    (groceriesSpend() / userBudget?.groceries) * 100
  );

  const internetSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.internetTransactions?.length; i++) {
      sum += data.internetTransactions[i].amount;
    }
    return sum;
  };
  let internetProgress = Math.floor(
    (internetSpend() / userBudget?.internet) * 100
  );

  const mobileSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.mobileTransactions?.length; i++) {
      sum += data.mobileTransactions[i].amount;
    }
    return sum;
  };
  let mobileProgress = Math.floor((mobileSpend() / userBudget?.mobile) * 100);

  const rentSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.rentTransactions?.length; i++) {
      sum += data.rentTransactions[i].amount;
    }
    return sum;
  };
  let rentProgress = Math.floor((rentSpend() / userBudget?.rent) * 100);

  const streamingSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.streamingTransactions?.length; i++) {
      sum += data.streamingTransactions[i].amount;
    }
    return sum;
  };
  let streamingProgress = Math.floor(
    (streamingSpend() / userBudget?.streaming) * 100
  );

  const utilitiesSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.utilitiesTransactions?.length; i++) {
      sum += data.utilitiesTransactions[i].amount;
    }
    return sum;
  };
  let utilitiesProgress = Math.floor(
    (utilitiesSpend() / userBudget?.utilities) * 100
  );

  const otherSpend = () => {
    let sum = 0;
    for (let i = 0; i < data?.otherTransactions?.length; i++) {
      sum += data.otherTransactions[i].amount;
    }
    return sum;
  };
  let otherProgress = Math.floor((otherSpend() / userBudget?.other) * 100);

  return (
    // Page output
    <div className="container d-flex flex-row">
      <div className="container col-8">
        <div className="progress my-1" style={{ height: "30px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated text-dark"
            role="progressbar"
            style={{ backgroundColor: "#e0b646", width: autoProgress + "%" }}
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
            style={{ backgroundColor: "#e0b646", width: mobileProgress + "%" }}
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
            style={{ backgroundColor: "#e0b646", width: rentProgress + "%" }}
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
            style={{ backgroundColor: "#e0b646", width: otherProgress + "%" }}
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
      {/* Side of budget */}
      <div>
        <div className="text-start">
          Income: <span>${userBudget?.income}</span>
        </div>
        <div className="text-start">
          Spending Budget:{" "}
          <span
            className={
              totalSpendingBudget > userBudget?.income
                ? "text-danger"
                : "text-dark"
            }
          >
            ${totalSpendingBudget}
          </span>
        </div>
        <div>
          <div className="text-start">Deposits: $</div>
          <div className="text-start">Total Spent: $</div>
        </div>
        <div>
        <Link
            to={`/budget/${userBudget?._id}`}
            className="btn btn-outline-success me-2 text-decoration-none"
            style={{ fontSize: "13px" }}
          >
            Edit Budget
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Budget;
