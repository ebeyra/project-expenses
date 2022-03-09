import React from "react";

const SearchTransactions = ({ sortedTransactions, setSearchResults }) => {
  const [searchParameters, setSearchParameters] = React.useState("");

  let filteredTransactions = (input) => {
    setSearchParameters(input);
    let searchResults = sortedTransactions.filter((transaction) => {
      return transaction.memo.toLowerCase().includes(input.toLowerCase());
    });
    setSearchResults(searchResults);
  };

  return (
    <div className="col-lg-2">
      <label htmlFor="transaction-search">Quick Search</label>
      <input
        className="form-control"
        type="text"
        id="transaction-search"
        placeholder="Search Memos"
        // value={""}
        onChange={(e) => {
          filteredTransactions(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchTransactions;
