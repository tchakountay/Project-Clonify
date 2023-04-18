import { useState, useContext } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const SongCard = ({ songs, chooseSong }) => {
  const { currentUser } = useContext(UserContext);

  //function to add song to library
  const addSongToLibrary = (song) => {

  const albumCover = song.album.images.length > 0 ? song.album.images[0].url : null;
  const songUri = song.uri;
  fetch(`http://localhost:8000/api/add-song-to-library/${currentUser._id}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    name: song.name,
    artist: song.artists[0].name,
    albumCover: albumCover,
    duration: song.duration_ms,
    songUri: songUri
   })
})
  .then(res => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));
}

  const [dropdownStates, setDropdownStates] = useState(
    Array(songs.length).fill(false)
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let firstResult = songs[0];
  let otherSongs = songs.slice(0, -15);
  console.log(otherSongs);

  //for time duration of the song
  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Container>
      <FirstResult>
        <CoverArt
          onClick={() => chooseSong(firstResult)}
          src={firstResult.album?.images[0]?.url}
          alt="album-cover"
        />
        <div>
          <h1>{firstResult.name}</h1>
          <p>{firstResult.artists[0].name}</p>
        </div>
      </FirstResult>
      <Results>
        {otherSongs.map((song, index) => {
          return (
            <Song key={song.id} onClick={() => chooseSong(song)}>
              <img src={song.album.images[0]?.url} />
              <div>
                <TitleNTime>
                  <h1>{song.name}</h1>
                  <p>{formatDuration(song.duration_ms)}</p>
                </TitleNTime>
                <ArtistNOptions>
                  <p>{song.artists[0].name}</p>
                  <Options
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(!dropdownOpen);
                      const updatedStates = [...dropdownStates];
                      updatedStates[index] = !updatedStates[index];
                      setDropdownStates(updatedStates);
                    }}
                  />
                </ArtistNOptions>
              </div>
              {dropdownStates[index] && (
                <DropdownMenu>
                  <p onClick={(e) => {
                    e.stopPropagation();
                    addSongToLibrary(song)}}>Add to library</p>
                </DropdownMenu>
              )}
            </Song>
          );
        })}
      </Results>
    </Container>
  );
};

const Options = styled(BiDotsHorizontalRounded)`
cursor: pointer;
`
const DropdownMenu = styled.div`
  position: relative;
  top: 100%;
  right: 0;
  height: fit-content;
  width: fit-content;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  p {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
`;

const ArtistNOptions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  p {
    max-width: 280px;
  }
`;

const TitleNTime = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  h1 {
    max-width: 280px;
  }
`;

const FirstResult = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-top: 10px;
    max-width: 320px;
  }
  h1 {
    font-size: 18px;
    color: black;
    text-align: left;
  }

  p {
    padding: 0px;
  }
`;

const Song = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 20%;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: lightgrey;
  }

  img {
    cursor: pointer;
  }
  div {
    width: 100%;
  }

  h1 {
    font-size: 16px;
    color: black;
    text-align: left;
  }

  p {
    font-size: 14px;
    color: black;
    text-align: left;
  }
`;

const CoverArt = styled.img`
  margin-top: 15px;
  width: 320px;

  &:hover {
    cursor: pointer;
  }
`;

const Results = styled.div`
  padding: 15px;
  height: 400px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 480px;

  img {
    height: 45px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 400px;
  width: 800px;
`;
export default SongCard;
