import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledContainer,
  StyledButton,
  StyledInput,
  StyledSelect,
} from "../styles/StyledComponents";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "ADMIN",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    localStorage.setItem("username", credentials.username);
    localStorage.setItem("password", credentials.password);
    localStorage.setItem("role", credentials.role);
    credentials.role === "ADMIN" ? navigate("/admin") : navigate("/client");
  };

  return (
    <StyledContainer>
      <h2>Login</h2>
      <StyledInput
        type="text"
        placeholder="Username"
        value={credentials.username}
        required
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={credentials.password}
        required
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <StyledSelect
        value={credentials.role}
        onChange={(e) =>
          setCredentials({ ...credentials, role: e.target.value })
        }
      >
        <option value="ADMIN">Admin</option>
        <option value="CLIENT">Client</option>
      </StyledSelect>
      <StyledButton onClick={handleLogin}>Login</StyledButton>
    </StyledContainer>
  );
};

export default Login;
