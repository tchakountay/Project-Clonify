import styled from "styled-components";
import React from "react";

const Input = ({ name, type, placeholder, handleChange }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(event) => handleChange(event.target.value, name)}
      />
    </Wrapper>
  );
};

const StyledInput = styled.input`
  padding: 4px;
  margin: 5px 0px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    display: none;
  }
`;

export default Input;
