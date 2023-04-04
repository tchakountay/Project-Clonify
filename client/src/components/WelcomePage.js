import styled from "styled-components";
import { useParams } from "react-router-dom";

const Welcome = () => {
    const { userId, userFullName } = useParams()
    console.log(userId);
    console.log(userFullName);

    const user = userFullName.split("_");

  return (
    <Container>
        <Title>Welcome {user[0]}</Title>
        <Connect>Connect to Clonify</Connect>
    </Container>
  );
};

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
