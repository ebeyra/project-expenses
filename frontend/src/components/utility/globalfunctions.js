// Logout function to call anywhere

export const logout = () => {
  localStorage.removeItem("token");
  console.log("You have logged out");
};

export const categoryEnum = [
  "Auto",
  "Credit Card",
  "Entertainment",
  "Groceries",
  "Internet",
  "Mobile",
  "Mortgage/Rent",
  "Refund",
  "Streaming",
  "Utilities",
  "Other",
];

export const categoryList = categoryEnum.map((eachCategory) => {
  return (
    <option value={eachCategory} key={eachCategory}>
      {eachCategory}
    </option>
  );
});
