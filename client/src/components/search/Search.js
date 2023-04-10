import styled from "styled-components";
import SideNavBar from "../homefeed/SideNavBar";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import MusicPlayer from "../MusicPlayer";
import SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Search = ({accessToken}) => {
  console.log(accessToken)

  const [searchInput, setSearchInput] = useState("");

  //search results by song, artist and album
  const [songs, setSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState({});

  const chooseSong = (song) => {
    setSelectedSong(song);
  }

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    accessToken: accessToken || localStorage.getItem('accessToken'),
  });

  useEffect(() => {
    if (!searchInput) return setSongs([]), setSingers([]), setAlbums([]);
    
    //search result by song
    spotifyApi.searchTracks(searchInput).then((res) => {
      setSongs(res.body.tracks.items);
    })
    
    //search result by artist
    spotifyApi.searchArtists(searchInput).then((res) => {
      setSingers(res.body.artists.items);
    })

    //search result by album
    spotifyApi.searchAlbums(searchInput).then((res) => {
      setAlbums(res.body.albums.items);
    })
    
  }, [searchInput, accessToken]);

  return (
    <Container>
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
            {songs.length > 0 && searchInput !== "" && (
              <CardsDiv>
                <SearchSection>
                  <h1>Songs</h1>
                </SearchSection>
                <Cards>
                  {songs.map((song) => {
                    return (
                      <SongCard
                      key={song.uri}
                      name={song.name}
                      artist={song.artists[0].name}
                      imageSrc={song.album.images[0]?.url}
                      chooseSong={() => chooseSong(song)}
                      />
                    );
                  })}
                </Cards>
              </CardsDiv>
            )}
            {singers.length > 0 && searchInput !== "" && (
              <CardsDiv>
                <SearchSection>
                  <h1>Artists</h1>
                </SearchSection>
                <Cards>
                  {singers.map((singer) => {
                    return (
                      <ArtistCard
                      artist={singer.name}
                      imageSrc={singer.images[0]?.url}
                      />
                    );
                  })}
                </Cards>
              </CardsDiv>
            )}
            {albums.length > 0 && searchInput !== "" && (
              <CardsDiv>
                <SearchSection>
                  <h1>Albums</h1>
                </SearchSection>
                <Cards>
                  {albums.map((album) => {
                    return (
                      <AlbumCard
                      artist={album.artists[0].name}
                      name={album.name}
                      imageSrc={album.images[0]?.url}
                      />
                    );
                  })}
                </Cards>
              </CardsDiv>
            )}
          </Results>
        </SearchForm>
      </SearchDiv>
    </SearchPage> 
    <MusicPlayer
      accessToken={accessToken}
      songUri={selectedSong? selectedSong.uri : null}
      />
    </Container>
  );
};

const Container = styled.div`
height: 100vh;
`

const SearchSection = styled.div`
  display: flex;
  justify-content: flex-start;
  h1 {
    color: black;
    font-size: 20px;
    margin-top: 10px;
  }
`;

const Results = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  max-height: 85vh;
`;

const Cards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &:hover {
    cursor: pointer;
  }
`;

const CardsDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-width: 1530px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchForm = styled.form`
  input {
    outline: none;
    border: 2px solid darkgray;
    border-radius: 25px;
    margin-left: 20px;
    margin-top: 10px;
  }
`;
const SearchPage = styled.div`
  display: flex;
  width: 90vh;
`;

export default Search;
