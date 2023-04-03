import styled from "styled-components";

const SignUpButton = ({handleClick2, subStatus2, disabled2}) => {
    return (
        <Container onClick={handleClick2} disabled={disabled2}>
            {subStatus2 === "loading" && <div>Loading...</div>}
            {subStatus2 === "idle" &&<div>Sign up</div>}
            {subStatus2 === "error" &&<div>Sign up</div>}
        </Container>
    )
}

const Container = styled.button`
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
export default SignUpButton;