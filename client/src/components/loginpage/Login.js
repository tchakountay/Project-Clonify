import styled from "styled-components";
import InputLogin from "./InputLogin";
import LoginButton from "./LoginBtn";
import ErrorMessages from "../Errors";

const LoginForm = ({
  handleSignup,
  disabled,
  handleChange,
  loginFormData,
  handleClick,
  subStatus,
  errorMsgs,
}) => {
  const handleSignupClick = (event) => {
    event.preventDefault();
    handleSignup();
  };
  return (
    <FormDiv>
      <Title>Login</Title>
      <LgnForm>
        <InputDiv>
          <div>
            <InputTxt>Email:</InputTxt>
          </div>
          <InputLogin
            name="email"
            type="text"
            placeholder="Email"
            handleChange={handleChange}
          />
        </InputDiv>
        <InputDiv>
          <div>
            <InputTxt>Password:</InputTxt>
          </div>
          <InputLogin
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
          />
        </InputDiv>
        <BtnDiv>
          <OrSignUpBtn onClick={handleSignupClick}> or Sign Up </OrSignUpBtn>
          <LoginButton
            loginFormData={loginFormData}
            handleClick={handleClick}
            disabled={disabled}
            subStatus={subStatus}
          />
        </BtnDiv>
        {subStatus === "error" && <ErrorMessages child={errorMsgs}/>}
      </LgnForm>
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
  margin: 15px;
  border-radius: 10px;
`;

const OrSignUpBtn = styled.button`
  font-size: 20px;
  border: none;
  background-color: black;
  color: white;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
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

const InputTxt = styled.p`
  color: black;
  font-size: 20px;
  margin: 0px;
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

const LgnForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
`;
export default LoginForm;
