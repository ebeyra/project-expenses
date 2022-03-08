import React from "react";
import { post, get } from "../http/service";
import { Link, useNavigate } from "react-router-dom";

const Budget = () => {
  const [userData, setUserData] = React.useState("");
  const navigate = useNavigate();

  const auto = "10%";

  React.useEffect(() => {
    get("/expenses")
      .then((results) => {
        setUserData(results.data);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

  const budgetItems = userData.foundBudget?.map((budgetDetails) => {
    for (let i = 0; i < budgetDetails.needs.length; i++) {
      return (
        <div className="progress my-1">
          <div
            className="progress-bar progress-bar-striped text-dark"
            role="progressbar"
            style={{ backgroundColor: "#e0b646", width: auto }}
            key={budgetDetails.needs[i]}
          >
            {budgetDetails.needs[i]}
          </div>
        </div>
      );
    }
  });

  console.log(budgetItems);

  return <div className="container col-4">{budgetItems}</div>;
};

export default Budget;
