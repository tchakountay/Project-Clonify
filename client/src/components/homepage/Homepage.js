import Navbar from "./Navigationbar";
import SignUp from "./Signup";
import Login from "./Login";
import useAuth from "../useAuth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import React from "react";

import { errors, initialStateLogin, initialStateSignup } from "../settings";
import { UserContext } from "../context/UserContext";

const Homepage = ({code, userId, setUserId}) => {
  const navigate = useNavigate();
  const accessToken = useAuth(code);

  const {setCurrentUser} = useContext(UserContext);
  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  //const's for the login form handling
  const [loginFormData, setLoginFormData] = useState(initialStateLogin);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [errorMsgs, setErrorMsgs] = useState("");

  //const's for the sign up form handling
  const [signUpFormData, setSignUpFormData] = useState(initialStateSignup);
  const [disabled2, setDisabled2] = useState(true);
  const [subStatus2, setSubStatus2] = useState("idle");
  const [errorMsgs2, setErrorMsgs2] = useState("");

  //USE EFFECT SIGN UP
  //Handles the disabled state for the button of the SIGNUP form
  useEffect(() => {
    Object.values(signUpFormData).includes("")
      ? setDisabled2(true)
      : setDisabled2(false);
  }, [signUpFormData, setDisabled2]);

  //USE EFFECT LOGIN
  //Handles the disabled state for the button of the LOGIN form
  useEffect(() => {
    Object.values(loginFormData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [loginFormData, setDisabled]);

  //HANDLE CHANGE LOGIN
  //Handles the change of the input of the LOGIN form
  const handleChange = (value, name) => {
    setLoginFormData({...loginFormData, [name]: value });
    setErrorMsgs("");
  };

  //HANDLE CHANGE SIGNUP
  //Handles the change of the input of the SIGNUP form
  const handleChange2 = (value, name) => {
    setSignUpFormData({...signUpFormData, [name]: value });
    setErrorMsgs2("");
  };
  
  //Handles the LOGIN form appearance
  const handleLogin = () => {
    setLoginForm(true);
    setSignUpForm(false);
  };

  //Handles the SIGNUP form appearance
  const handleSignUp = () => {
    setSignUpForm(true);
    setLoginForm(false);
  }

//FETCH SIGN UP DATA
//handles the Signup confirmation
const handleClick2 = (event) => {
  event.preventDefault();
  setSubStatus2("loading");
  fetch("http://localhost:8000/api/register", {
    method: "POST",
    body: JSON.stringify(signUpFormData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) =>res.json())
    .then((json) => {
      const { status, error } = json;
      console.log(json);
      if (status === 200) {
        setSubStatus2("confirmed");
        console.log("navigating to welcome page");
        setCurrentUser(json.data);
        navigate(`/welcome`);
        console.log(signUpFormData);
      } else if (error) {
        setSubStatus2("error");
        setErrorMsgs2(errors[error]);
      }
    })
    .catch((error) => {
      console.error(error);
      setSubStatus2("error");
      setErrorMsgs2("Something went wrong, please try again later.");
    }
    )
};

// FETCH LOGIN DATA
// handles the Login confirmation
const handleClick = (event) => {
  event.preventDefault();
  setSubStatus("loading");
  fetch("http://localhost:8000/api/login", {
    method: "POST",
    body: JSON.stringify(loginFormData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const { status, error } = json;
      console.log(json);
      if (status === 200) {
        setSubStatus("confirmed");
        setCurrentUser(json.data);
        console.log("navigating to home page");
        navigate(`/home`);
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
                errorMsgs={errorMsgs}
              />
            </LoginDiv>
            <SignUpDiv signUpForm={signUpForm}>
              <SignUp 
              disabled2={disabled2}
              subStatus2={subStatus2}
              handleChange2={handleChange2}
              signUpFormData={signUpFormData}
              handleClick2={handleClick2}
              errorMsgs2={errorMsgs2}/>
            </SignUpDiv>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </Container>
  );
};

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
