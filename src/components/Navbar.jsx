import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledNavBar, StyledNavButton } from "../styles/StyledComponents";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <StyledNavBar>
      <h1>Inventory App</h1>
      <StyledNavButton onClick={handleLogout}>Logout</StyledNavButton>
    </StyledNavBar>
  );
};

export default Navbar;
