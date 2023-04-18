import styled from "styled-components";
import SideNavBar from "../SideNavBar";
import UserHeader from "../UserHeader";
import SongSection from "./SongSection";
import AlbumSection from "./AlbumSection";
import MusicPlayer from "../MusicPlayer";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";

const Home = ({accessToken, addSongToLibrary}) => {
  const [homefeedSongs, setHomefeedSongs] = useState([]);
  const [homefeedAlbums, setHomefeedAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});

  const chooseSong = (song) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    if (!accessToken) return;

    //fetch homefeed songs
    fetch("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHomefeedSongs(data.items);
      });

      //fetch homefeed albums
      fetch("https://api.spotify.com/v1/me/albums", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setHomefeedAlbums(data.items);
      });
  }, [accessToken]);

  return (
    <>
      <Container>
        <UserHeader />
        <SideNavBar />
        {homefeedSongs.length === 0 || homefeedAlbums.length === 0 ? (
          <Loading>
            <ClipLoader
              color="lightgrey"
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Loading>
        ) : (
          <Cards>
            <SongSection
            songs={homefeedSongs}
            chooseSong={chooseSong}  
            addSongToLibrary={addSongToLibrary} 
            />
            <AlbumSection
            albums={homefeedAlbums}
            />
          </Cards>
        )}
        <MusicPlayer
        songUri={selectedSong.uri}
        accessToken={accessToken}/>
      </Container>
    </>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Cards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  height: fit-content;
  margin-top: 40px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
`;

export default Home;
