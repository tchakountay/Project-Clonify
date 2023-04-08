import styled from "styled-components";
import { useState } from "react";
import {
  BiHome,
  BiSearch,
  BiLibrary,
  BiUser,
  BiBell,
  BiBookmark,
  BiPlus,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideNavBar = () => {
  const [activeTab, setActiveTab] = useState("/");

  const handleClick = (tab) => {
    setActiveTab(tab);
    return activeTab;
  };
  return (
    <Container>
      <Title>Clonify</Title>
      <Navigation>
        <NavItem>
          <Nav to="/home">
            <Icon>
              <BiHome />
            </Icon>
            Home
          </Nav>
        </NavItem>
        <NavItem>
          <Nav to="/search">
            <Icon>
              <BiSearch />
            </Icon>
            Search
          </Nav>
        </NavItem>
        <NavItem>
          <Nav to="/library">
            <Icon>
              <BiLibrary />
            </Icon>
            Library
          </Nav>
        </NavItem>
      </Navigation>
      <PlaylistDiv>
        <Playlist>
          <p>
            <Plus>
              <BiPlus />
            </Plus>
            Create a playlist
          </p>
        </Playlist>
      </PlaylistDiv>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 2rem;
  font-family: "Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;
  margin-bottom: 1rem;
  margin-top: 1rem;
  position: relative;
`;

const PlaylistDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Playlist = styled.button`
  margin-top: 40px;
  background: transparent;
  width: 200px;
  
  &:hover{
    opacity: 0.8;
    cursor: pointer;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding: 0px;
  }
`;

const Plus = styled.span`
  font-size: 30px;
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  width: 250px;
  min-width: 250px;
  height: 100vh;
  position: relative;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-family: "Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;
  padding-left: 20px;
`;

const NavItem = styled.span`
  margin-bottom: 10px;
  margin-top: 10px;
  text-decoration: none;
  font-weight: bold;
  width: 200px;

  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled(NavLink)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  width: 190px;
  margin-left: 10px;
  &.active {
    opacity: 0.8;
  }
`;

const Icon = styled.span`
  font-size: 30px;
  text-align: center;
  padding-right: 20px;
`;

export default SideNavBar;
