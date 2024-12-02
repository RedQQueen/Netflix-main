import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSignIn = async () => {
    console.log(formValues);
    try {
      const { email, password, username } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(firebaseAuth.currentUser, { displayName: username });
      await axios.post("http://localhost:5000/api/user/create", {
        email,
        username, // Save the username to MongoDB
      });
      console.log("User saved to MongoDB:", username);
    } catch (err) {
      console.log(err);
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  };

  return (
    <Container className="flex a-center j-center" showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login={false} />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV Shows and more...</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              membership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Username" // Username input field
              name="username"
              value={formValues.username}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}

            {/* {showPassword && <button>Log In</button>} */}
            <button onClick={handleSignIn}> Sign Up</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 2fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
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
      }
    }
  }
`;
