import styled from "styled-components";
import { UserContext } from "./context/UserContext";
import { useContext, useState } from "react";

const UserHeader = () => {
  const { currentUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //User icon displayed as user image
  const userIcon =
    currentUser?.firstName?.charAt(0)?.toUpperCase() +
    currentUser?.lastName?.charAt(0)?.toUpperCase();

  const handleSignOut = () => {
    // Implement your sign out logic here
  };

  return (
    <>
      {!currentUser ? (
        <div>Loading . . .</div>
      ) : (
        <Container>
          <Icon onClick={() => setDropdownOpen(!dropdownOpen)}>
            <h1>{userIcon}</h1>
            {dropdownOpen && (
              <Dropdown>
                <DropdownOption onClick={handleSignOut}>
                  Sign out
                </DropdownOption>
              </Dropdown>
            )}
          </Icon>
          <UserFullname>
            {currentUser.firstName} {currentUser.lastName}
          </UserFullname>
        </Container>
      )}
    </>
  );
};

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 100px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

const DropdownOption = styled.p`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const Icon = styled.div`
  background-color: #bb99ff;
  height: 30px;
  width: 30px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 15px;
    margin: 10px;
  }
`;

const Container = styled.div`
  position: fixed;
  margin-top: 10px;
  right: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: content;
  height: 40px;

  &:hover {
    cursor: pointer;
  }
`;

const UserFullname = styled.p`
  font-size: 20px;
  margin: 10px;
  color: black;
`;

export default UserHeader;
