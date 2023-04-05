import styled from 'styled-components';
import SideNavBar from './SideNavBar';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const {currentUser} = useContext(UserContext);
    console.log(currentUser);
    return (
        <Container>
            <SideNavBar/>
        </Container>
    )
}

const Container = styled.div``
const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    color: black;
`;

export default Home;