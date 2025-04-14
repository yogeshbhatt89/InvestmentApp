import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../modules/ButtonComponent";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>You are logged in!</p>

      <ButtonComponent
        label="Logout"
        onClick={handleLogout}
        variant="contained"
        fullWidth={false}
        className="mt-4"
      />
    </div>
  );
};

export default HomePage;
