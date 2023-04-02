import styled from "styled-components";
import Input from "./Input";
import React from "react";

const SignUp = () => {
  return (
    <FormDiv>
      <Title>Sign up</Title>
      <LoginForm>
        <InputDiv>
          <Input type="text" placeholder="First name" required={true}/>
          <Input type="text" placeholder="Last name" required={true}/>
          <Input type="text" placeholder="Email" required={true} />
          <Input type="text" placeholder="Password" required={true}/>
          <Input type="text" placeholder="Confirm password" required={true} />
        </InputDiv>
        <BtnDiv>
          <SignUpBtn type="submit"> Submit </SignUpBtn>
        </BtnDiv>
      </LoginForm>
    </FormDiv>
  );
};

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: content;
  border-radius: 10px;
`;

const SignUpBtn = styled.button`
  font-size: 20px;
  border: none;
  background-color: #301e67;
  color: white;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between; ;
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
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
`;

export default SignUp;
