import styled from "styled-components";
import SideNavBar from "../SideNavBar";
import UserHeader from "../UserHeader";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import MusicPlayer from "../MusicPlayer";
import SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Search = ({ accessToken }) => {
  console.log(accessToken);

  const [searchInput, setSearchInput] = useState("");

  //search results by song, artist and album
  const [songs, setSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});

  const chooseSong = (song) => {
    setSelectedSong(song);
  };

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    accessToken: accessToken || localStorage.getItem("accessToken"),
  });

  useEffect(() => {
    if (!searchInput) return setSongs([]), setSingers([]), setAlbums([]);

    //search result by song
    spotifyApi.searchTracks(searchInput).then((res) => {
      setSongs(res.body.tracks.items);
    });

    //search result by artist
    spotifyApi.searchArtists(searchInput).then((res) => {
      setSingers(res.body.artists.items);
    });

    //search result by album
    spotifyApi.searchAlbums(searchInput).then((res) => {
      setAlbums(res.body.albums.items);
    });
  }, [searchInput, accessToken]);

  return (
    <Container>
      <UserHeader />
      <SearchPage>
        <SideNavBar />
        <SearchDiv>
          <SearchForm>
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Results>
              <MusicResults>
                {songs.length > 0 && searchInput !== "" && (
                  <CardsDiv>
                    <SearchSection>
                      <h1>Songs</h1>
                    </SearchSection>
                    <SongCard songs={songs} chooseSong={chooseSong}/>
                  </CardsDiv>
                )}
                {albums.length > 0 && searchInput !== "" && (
                  <CardsDiv>
                    <SearchSection>
                      <h1>Albums</h1>
                    </SearchSection>
                    <AlbumCard albums={albums} />
                  </CardsDiv>
                )}
              </MusicResults>
              {singers.length > 0 && searchInput !== "" && (
                <ArtistSection>
                  <CardsDiv>
                    <SearchSection>
                      <h1>Artists</h1>
                    </SearchSection>
                    <ArtistCard singers={singers} />
                  </CardsDiv>
                </ArtistSection>
              )}
            </Results>
          </SearchForm>
        </SearchDiv>
      </SearchPage>
      <MusicPlayer
        accessToken={accessToken}
        songUri={selectedSong.uri}
      />
    </Container>
  );
};

const ArtistSection = styled.div`
  border-top: 1px solid lightgrey;
  width: 100%;
  display: flex;
  margin-left: 20px;
`;

const Container = styled.div`
  height: 100vh;
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: flex-start;
  h1 {
    color: black;
    font-size: 16px;
    margin-top: 10px;
  }
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

const MusicResults = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  height: fit-content;
  margin-top: 0px;
`;

const CardsDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchForm = styled.form`
  width: 100%;
  input {
    outline: none;
    border: 2px solid darkgray;
    border-radius: 25px;
    margin-left: 20px;
    margin-top: 10px;
    height: 30px;
  }
`;
const SearchPage = styled.div`
  display: flex;
`;

export default Search;
