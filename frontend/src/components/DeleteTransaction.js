import React from "react";
import { useParams } from "react-router-dom";

const DeleteTransaction = () => {
  const { transId } = useParams();

  return (
    <div>
      <h1>Edit transaction</h1>
      <p>{transId}</p>
    </div>
  );
};

export default DeleteTransaction;