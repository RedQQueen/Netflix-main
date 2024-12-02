import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header({ login }) {
  const handleButtonClick = () => {
    // If on login page, navigate to signup and vice di versa
    navigate(login ? "/signup" : "/login");
  };
  const navigate = useNavigate();
  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={handleButtonClick}>
        {login ? "Sign Up" : "Log In"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: bolder;
    font-size: 1.05rem;
    border-radius: 0.2rem;
  }
`;
