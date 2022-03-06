// Logout function to call anywhere

export const logout = () => {
  localStorage.removeItem("token");
  console.log("You have logged out");
};
