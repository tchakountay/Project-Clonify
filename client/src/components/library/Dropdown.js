import styled from "styled-components";

const Dropdown = ({ songId, removeSong, isOpen}) => {

    return isOpen ? (
        <Container onClick={() => removeSong(songId)}>
            <p>Remove from library</p>
        </Container>
    ) : null;
}

const Container = styled.div`
    cursor: pointer;
    position: fixed;
    margin-top: 20px;
    background-color: white;
    border: 1px solid black;
    border-radius:5px;
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 5px;
    }
`
export default Dropdown;