import styled from "styled-components";
import React from "react";
import SignUpButton from "./SignupBtn";
import InputSignup from "./InputSignup";
import ErrorMessages from "../Errors";

const SignUp = ({
  disabled2,
  subStatus2,
  handleChange2,
  signUpFormData,
  handleClick2,
  errorMsgs2,
}) => {
  console.log(disabled2);
  return (
    <FormDiv>
      <Title>Sign up</Title>
      <SignupForm>
        <InputDiv>
          <div>
            <InputTxt>First name:</InputTxt>
          </div>
          <InputSignup
            name="firstName"
            type="text"
            placeholder="First name"
            handleChange2={handleChange2}
          />
        </InputDiv>
        <InputDiv>
          <div>
            <InputTxt>Last name:</InputTxt>
          </div>
          <InputSignup
            name="lastName"
            type="text"
            placeholder="Last name"
            handleChange2={handleChange2}
          />
        </InputDiv>
        <InputDiv>
          <div>
            <InputTxt>Email:</InputTxt>
          </div>
          <InputSignup
            name="email"
            type="text"
            placeholder="Email"
            handleChange2={handleChange2}
          />
        </InputDiv>
        <InputDiv>
          <div>
            <InputTxt>Password:</InputTxt>
          </div>
          <InputSignup
            name="password"
            type="password"
            placeholder="Password"
            handleChange2={handleChange2}
          />
        </InputDiv>
        <InputDiv>
          <div>
            <InputTxt>Confirm password:</InputTxt>
          </div>
          <InputSignup
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            handleChange2={handleChange2}
          />
        </InputDiv>
        <BtnDiv>
          <SignUpButton
          disabled2={disabled2}
          subStatus2={subStatus2}
          handleClick2={handleClick2} 
          signUpFormData={signUpFormData}
          /> 
        </BtnDiv>
        {subStatus2 === "error" && <ErrorMessages child={errorMsgs2}/>}
      </SignupForm>
    </FormDiv>
  );
};

const InputTxt = styled.p`
  color: black;
  font-size: 20px;
  margin: 0px;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: content;
  width: 320px;
  border-radius: 10px;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  background-color: black;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;

  div {
    display: flex;
    width: 100%;
    align-items: flex-start;
  }
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
`;

export default SignUp;
