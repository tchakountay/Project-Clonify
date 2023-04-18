import styled from "styled-components";

const Dropdown = ({ songId, isOpen, addSongToLibrary, song}) => {

    return isOpen ? (
        <Container onClick={(e) => {
            e.stopPropagation();
            addSongToLibrary(song)}}>
            <p>Add song to library</p>
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
    max-width: 150px;
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