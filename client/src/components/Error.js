import styled from "styled-components";

const Error = () => {
    return (
        <Wrapper>
            <h1>Error</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

h1 {
    font-size: 3rem;
    color: red;
}
`

export default Error;
