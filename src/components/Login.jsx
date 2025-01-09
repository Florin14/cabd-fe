import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { StyledContainer, StyledButton, StyledInput } from "../styles/StyledComponents";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await login(credentials.username, credentials.password);
      localStorage.setItem("token", data.token);
      data.role === "ADMIN" ? navigate("/admin") : navigate("/client");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <StyledContainer>
      <h2>Login</h2>
      <StyledInput
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <StyledButton onClick={handleLogin}>Login</StyledButton>
    </StyledContainer>
  );
};

export default Login;
