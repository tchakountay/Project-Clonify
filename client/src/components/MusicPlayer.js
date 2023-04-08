import styled from "styled-components";
import SpotifyPlayer from "react-spotify-web-playback";
import { useEffect } from "react";

const MusicPlayer = ({accessToken, songUri}) => {
    if (!accessToken) return null;
    return (
        <div>
           <SpotifyPlayer 
           token={accessToken}
           showSaveIcon
           uris={songUri ? [songUri] : []}/>
        </div>
    )
}
export default MusicPlayer;