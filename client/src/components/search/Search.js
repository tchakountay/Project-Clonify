import styled from "styled-components";
import SideNavBar from "../homefeed/SideNavBar";
import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import MusicPlayer from "../MusicPlayer";
import { useState } from "react";

const Search = ({ accessToken }) => {
  let cancelReq = true;
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);

    //RESULTS for ARTISTS
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSingers(data.artists.items);
      });

    //RESULTS for ALBUMS
    let albumParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let albumID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=album",
      albumParams
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.albums.items);
      });

    //RESULTS for SONGS
    let songParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let songID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      songParams
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSongs(data.tracks.items);
      });
  };
  console.log(songs);

  return (
    <Container>
      <SideNavBar />
      <SearchDiv>
        <SearchForm onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchInput}
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
                        onClick={() => setSelectedSong(song)}
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
      <MusicPlayer
      accessToken={accessToken}
      songUri={selectedSong? selectedSong.uri : null}
      />
    </Container>
  );
};

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
`;

const Cards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CardsDiv = styled.div`
  display: flex;
  flex-direction: column;
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
const Container = styled.div`
  display: flex;
`;

export default Search;
