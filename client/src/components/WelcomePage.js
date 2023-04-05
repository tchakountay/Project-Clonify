import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Welcome = () => {
    const { currentUser } = useContext(UserContext);

  return (
    <Container>
        <Title>Welcome {currentUser.firstName}</Title>
        <Redirect to={`/home`}>
          <Connect>Connect to Clonify</Connect>
        </Redirect>
    </Container>
  );
};

const Redirect = styled(NavLink)`
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
color: black;
`

const Connect = styled.button`
margin-top: 20px;
width: 300px;`
export default Welcome;
