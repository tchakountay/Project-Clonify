import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=363392aa387d45b293dde37b252f7e6d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const SpotifyAuth = () => {
  // setCode(new URLSearchParams(window.location.search).get("code"));
    return (
        <Container>
            <NavLink to={AUTH_URL}>
              <SpotifyAuthButton >Login to Spotify</SpotifyAuthButton>
            </NavLink>
        </Container>
    )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `

  const SpotifyAuthButton = styled.button`
    font-size: 18px;
    color: white;
    background-color: green;
    text-decoration: none;
`
export default SpotifyAuth;