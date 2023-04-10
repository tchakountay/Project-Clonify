import styled from "styled-components";
// import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyPlayer from "react-spotify-web-playback";
import { useState, useEffect } from "react";

const MusicPlayer = ({accessToken, songUri}) => {
    const [play, setPlay] = useState(false);
    useEffect(() => setPlay(true), [songUri]);
    
    if (!accessToken) return null;
    return (
        <Container>
           <SpotifyPlayer 
           token={accessToken}
           showSaveIcon
           callback={state => {
            if (!state.isPlaying) setPlay(false);
           }}
           play={play}
           uris={songUri ? [songUri] : []}/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`
export default MusicPlayer;