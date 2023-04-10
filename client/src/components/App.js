import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./homepage/Homepage";
import Welcome from "./WelcomePage";
import Home from "./homefeed/Home";
import Search from "./search/Search";
import SpotifyAuth from "./SpotifyAuth";
import { UserProvider , UserContext} from "./context/UserContext";
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

const App = () => {
  //usestate's for our tokens
  const [accessToken, setAccessToken] = useState('');
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState();
  const [userId, setUserId] = useState('');
  
  const code = new URLSearchParams(window.location.search).get("code")

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    //Fetch the access token from Spotify
    fetch("http://localhost:8000/spotifylogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        // window.history.pushState("", "", "/")
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);
      })
      .catch((error) => {
        console.log(error);
        window.location = "/";
      });
  }, [code]);

  //fetch for refresh token
     useEffect(() => {
      if (!refreshToken || !expiresIn) return;
      const interval = setInterval(() => {
        fetch("http://localhost:8000/spotifyrefresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
          .then((res) => res.json())
          .then((data) => {
            setAccessToken(data.accessToken);
            setExpiresIn(data.expiresIn);
          })
          .catch(() => {
            window.location = "/";
          });
      }, (expiresIn - 60) * 1000);

      return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    console.log(accessToken);
    console.log(refreshToken);
    console.log(code)
    return (
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route 
            path="/"
            element={
              code ? (
                <Homepage userId={userId} setUserId={setUserId} />
              ) : (
                <SpotifyAuth />
              )
            }
          />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search accessToken={accessToken}/>} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
