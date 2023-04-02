import styled from "styled-components";

const ErrorMessages = ({ child }) => {
  return <Container>{child}</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 15px;
  margin: 0 auto;
`;

export default ErrorMessages;
