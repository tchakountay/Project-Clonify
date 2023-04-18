import Dropdown from "./Dropdown";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { UserContext } from "../context/UserContext";

const SongSection = ({ songs, chooseSong }) => {
  const [songMenuStates, setSongMenuStates] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { currentUser } = useContext(UserContext);
  //handling of the first result vs the rest 
  let firstResult = songs[0];
  let otherSongs = songs.slice(0, -15) || songs.track.slice(0, -15);


  //for time duration of the song
  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  //function to add song to library
  const addSongToLibrary = (song) => {

    const albumCover = song.track.album.images.length > 0 ? song.track.album.images[0].url : null;
    const songUri = song.track.uri;
    fetch(`http://localhost:8000/api/add-song-to-library/${currentUser._id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name: song.track.name,
      artist: song.track.artists[0].name,
      albumCover: albumCover,
      duration: song.track.duration_ms,
      songUri: songUri
     })
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  //Use effect to toggle the dropdown display
  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  //Prevents dropdown to appear multiple times all at once
  const toggleSongMenu = (songId) => {
    setSongMenuStates((prevState) => ({
      ...prevState,
      [songId]: !prevState[songId],
    }));
  };

  //function to add song to
  return (
    <Container >
      <FirstResult>
        <CoverArt onClick={() => chooseSong(firstResult.track)} src={firstResult.track.album.images[0]?.url} alt="album-cover" />
        <Option/>
        <div>
          <h1>{firstResult.track.name}</h1>
          <p>{firstResult.track.artists[0].name}</p>
        </div>
      </FirstResult>
      <Results>
        {otherSongs.map((song) => {
          return (
            <Song
            key={song.track.id}
            onClick={() => chooseSong(song.track)}>
              <img  src={song.track.album.images[0]?.url} />
              <Options onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
                toggleSongMenu(song.track.id);
                }}
                />
                {dropdownOpen && songMenuStates[song.track.id] && 
                <Dropdown  
                songId={song.track.id} 
                isOpen={dropdownOpen}
                addSongToLibrary={addSongToLibrary} 
                song={song}
                />}
              <div>
                <TitleNTime>
                  <h1>{song.track.name}</h1>
                  <p>{formatDuration(song.track.duration_ms)}</p>
                </TitleNTime>
                <p>{song.track.artists[0].name}</p>
              </div>
            </Song>
          );
        })}
      </Results>
    </Container>
  );
};

const Option = styled(BiDotsHorizontalRounded)`
position: fixed;
color: white;
font-size: 30px;
margin-left: 280px;
margin-top: 15px;
&:hover {
  cursor: pointer;
}
`

const Options = styled(BiDotsHorizontalRounded)`
position: fixed;
color: black;
margin-left: 400px;
margin-top: 15px;
&:hover {
  cursor: pointer;
}
`

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
    max-width:320px;
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
  padding: 1rem;

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
  justify-content: space-between;
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
export default SongSection;
