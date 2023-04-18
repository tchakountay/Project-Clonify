import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const LoginButton = ({ handleClick, subStatus, disabled }) => {
  return (
    <Container onClick={handleClick} disabled={disabled}>
      {subStatus === "loading" && (
        <Loading>
          <ClipLoader
            color="lightgrey"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Loading>
      )}
      {subStatus === "idle" && <div>Login to Clonify</div>}
      {subStatus === "error" && <div>Login to Clonify</div>}
    </Container>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

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
