import SideNavBar from "../SideNavBar";
import styled from "styled-components";
import UserHeader from "../UserHeader";
import Dropdown from "./Dropdown";
import MusicPlayer from "../MusicPlayer";
import ClipLoader from "react-spinners/ClipLoader";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { UserContext } from "../context/UserContext";
import { useState, useEffect, useContext } from "react";

const Library = ({ accessToken }) => {
  const [savedSongs, setSavedSongs] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [songMenuStates, setSongMenuStates] = useState({});
  const [selectedSong, setSelectedSong] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //Use effect to toggle the dropdown display
  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const chooseSong = (song) => {
    setSelectedSong(song);
  };

  //Function for fetch to remove a song from library
  const removeSong = (songId) => {
    const updatedSongs = savedSongs.filter((song) => song._id !== songId);
    setSavedSongs(updatedSongs);

    fetch(
      `http://localhost:8000/api/get-song-from-library/${currentUser._id}/${songId}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data) {
          setSavedSongs(savedSongs);
        }
      })
      .catch((err) => {
        console.log(err);
        setSavedSongs(savedSongs);
      });
  };

  //fetch to get the user's library
  useEffect(() => {
    fetch(`http://localhost:8000/api/get-user-library/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setSavedSongs(data.userLibrary.songsSaved);
        console.log(data.userLibrary.songsSaved);
      })
      .catch((err) => {
        console.log(err);
        setSavedSongs([]);
      });
  }, [currentUser]);

  const toggleSongMenu = (songId) => {
    setSongMenuStates((prevState) => ({
      ...prevState,
      [songId]: !prevState[songId],
    }));
  };

  return (
    <Container>
      <UserHeader />
      <SideNavBar />
      {savedSongs === null ? (
        <Loading>
          <ClipLoader
            color="lightgrey"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Loading>
      ) : (
        <Wrapper>
          <LibraryDiv>
            {savedSongs.length === 0 ? (
              <p>Your Library is empty</p>
            ) : (
              savedSongs.map((song, index) => {
                return (
                  <Card key={index} onClick={() => chooseSong(song)}>
                    <Options
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSongMenu(song._id);
                        toggleDropdown();
                      }}
                    />
                    {dropdownOpen && songMenuStates[song._id] && (
                      <Dropdown
                        songId={song._id}
                        removeSong={removeSong}
                        isOpen={dropdownOpen}
                      />
                    )}
                    <img src={song?.albumCover} />
                    <h1>
                      {song.name.length > 20
                        ? song.name.slice(0, 20) + "..."
                        : song.name}
                    </h1>
                    <p>by {song?.artist}</p>
                  </Card>
                );
              })
            )}
          </LibraryDiv>
        </Wrapper>
      )}
      <MusicPlayer accessToken={accessToken} songUri={selectedSong.songUri} />
    </Container>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Options = styled(BiDotsHorizontalRounded)`
  position: fixed;
  color: white;
  font-size: 30px;
  margin-left: 150px;
  &:hover {
    cursor: pointer;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: lightgrey;
  height: content;
  max-width: 200px;
  padding: 10px;

  h1 {
    margin: 5px;
    font-size: 14px;
    color: black;
  }
  img {
    height: 200px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 100px;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
`;

const EmptyLibrary = styled.div`
  color: black;
`;
const LibraryDiv = styled.div`
  display: flex;
  gap: 10px;
  max-width: 900px;
  height: fit-content;
  flex-wrap: wrap;

  p {
    color: black;
  }
`;

export default Library;
