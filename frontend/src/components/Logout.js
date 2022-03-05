import React from "react";

const Logout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    console.log("You have logged out");
  };

  return (
    <div>
      <button type="submit" onClick={logout}>
        Log Out Here
      </button>
    </div>
  );
};

export default Logout;
