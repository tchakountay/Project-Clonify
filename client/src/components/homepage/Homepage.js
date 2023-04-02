import Navbar from "./Navigationbar";
import SignUp from "./Signup";
import Login from "./Login";
import styled from "styled-components";
import { useEffect, useState } from "react";
import React from "react";

import { errors, initialStateLogin } from "../settings";

const Homepage = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  //Handles the login form data
  const [loginFormData, setLoginFormData] = useState(initialStateLogin);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [errorMsgs, setErrorMsgs] = useState("");

  //Handles the disabled state for the button
  useEffect(() => {
    Object.values(loginFormData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [loginFormData, setDisabled]);

  const handleChange = (value, name) => {
    setLoginFormData({ ...loginFormData, [name]: value });
    setErrorMsgs("");
  };
  
  //Handles the login form appearance
  const handleLogin = () => {
    setLoginForm(true);
    setSignUpForm(false);
  };

// fetch to get the users collection from the db
// handles the confirmation of the users in the db
  const handleClick = (event) => {
    event.preventDefault();
    setSubStatus("loading");
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      body: JSON.stringify(loginFormData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json()
        console.log(res);
      })
      .then((json) => {
        const { status, error } = json;
        if (status === "success") {
          setSubStatus("confirmed");
        } else if (error) {
          setSubStatus("error");
          setErrorMsgs(errors[error]);
        }
      })
      .catch((error) => {
        console.error(error);
        setSubStatus("error");
        setErrorMsgs("Something went wrong, please try again later.");
      }
      )
  };

  //Handles the signup form appearance
  const handleSignup = () => {
    setSignUpForm(true);
    setLoginForm(false);
  };

  return (
    <Container>
      <Navbar handleLogin={handleLogin} handleSignup={handleSignup} />
      <Wrapper>
        {subStatus !== "confirmed" ? (
          <>
            <LoginDiv loginForm={loginForm}>
              <Login
                disabled={disabled}
                handleChange={handleChange}
                loginFormData={loginFormData}
                handleClick={handleClick}
                subStatus={subStatus}
                handleSignup={handleSignup}
              />
            </LoginDiv>
            <SignUpDiv signUpForm={signUpForm}>
              <SignUp />
            </SignUpDiv>
            {subStatus === "error" && <ErrorMessages>{errorMsgs}</ErrorMessages>}
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </Container>
  );
};

const ErrorMessages = styled.div`
`
const LoginDiv = styled.div`
  display: ${(props) => (props.loginForm === true ? "block" : "none")};
`;

const SignUpDiv = styled.div`
  display: ${(props) => (props.signUpForm === true ? "block" : "none")};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Container = styled.div`
  height: 100vh;
`;

export default Homepage;
