import React from "react";

const Budget = () => {

    const auto = "10%"

  return (
    <div className="container col-4">
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: auto }}
        >
          Auto %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "25%" }}
        >
          Credit Card %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "50%" }}
        >
          Groceries %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "75%" }}
        >
          Internet %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "100%" }}
        >
          Mobile %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "100%" }}
        >
          Rent/Mortgage %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "100%" }}
        >
          Utilities %
        </div>
      </div>
      <div className="progress my-1">
        <div
          className="progress-bar progress-bar-striped text-dark"
          role="progressbar"
          style={{ backgroundColor: "#e0b646", width: "100%" }}
        >
          Other %
        </div>
      </div>
    </div>
  );
};

export default Budget;
