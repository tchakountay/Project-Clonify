import styled from "styled-components";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=363392aa387d45b293dde37b252f7e6d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const SpotifyAuth = () => {
    return (
        <Container>
            <SpotifyAuthButton href={AUTH_URL}>Login to Spotify</SpotifyAuthButton>
        </Container>
    )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `

  const SpotifyAuthButton = styled.a`
    font-size: 18px;
    color: white;
    background-color: green;
    text-decoration: none;
`
export default SpotifyAuth;