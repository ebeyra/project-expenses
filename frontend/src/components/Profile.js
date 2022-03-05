import React from "react";
import { get, post } from "../http/service";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate("");

  React.useEffect(() => {
    get("/expenses")
      .then((results) => {
        console.log("Are you logged in?", results.data);
      })
      .catch((err) => {
        console.error(err.message);
        navigate("/noauth");
      });
  }, []);

  return <div>Profile page</div>;
};

export default Profile;
