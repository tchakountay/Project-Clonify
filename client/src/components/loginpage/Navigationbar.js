import styled from "styled-components";
import React from "react";


const Navbar = ({handleLogin, handleSignup}) => {

    return (
        <NavbarContainer>
            <Wrapper>
                <Title>Clonify</Title>
                <UserLog>
                    <LoginButton onClick={handleLogin}>Login</LoginButton>
                    <SignUp onClick={handleSignup}>Sign up</SignUp>
                </UserLog>
            </Wrapper>
        </NavbarContainer>
    )
}

const SignUp = styled.button`
  font-size: 24px;
  color: white;
  border: none;
  background: none;
  cursor: pointer;`

const UserLog = styled.div`
  display: flex;
  width: 330px;
  justify-content: space-between;
  align-items: center;`

const LoginButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: #b3b3ff;
  border: none;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  cursor: pointer;
  `
const Title = styled.h1`
  color: white;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  `
const NavbarContainer = styled.div`
  background-color: black;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default Navbar;
