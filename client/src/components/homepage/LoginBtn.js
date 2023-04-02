import styled from 'styled-components';

const LoginButton = ({ handleClick, subStatus, disabled }) => {
    return (
        <Container onClick={handleClick} disabled={disabled}>
            {subStatus === "loading" && <div>Loading...</div>}
            {subStatus === "idle" &&<div>Login to Clonify</div>}
            {subStatus === "error" &&<div>Login to Clonify</div>}
        </Container>
    )
}

const Container = styled.button`
  font-size: 20px;
  border: none;
  background-color: #301e67;
  color: white;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default LoginButton;