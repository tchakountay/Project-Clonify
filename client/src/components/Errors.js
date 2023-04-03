import styled from "styled-components";

const ErrorMessages = ({ child }) => {
  return <Container>{child}</Container>
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  color: red;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'Kosugi', Arial, Helvetica, sans-serif;
  max-width: 200px;
  text-align: center;
`;

export default ErrorMessages;
