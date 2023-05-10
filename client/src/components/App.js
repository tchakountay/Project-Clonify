import GlobalStyles from "./GlobalStyles";
import LoginPage from "./loginpage/Loginpage";
import Welcome from "./WelcomePage";
import Home from "./homefeed/Home";
import Library from "./library/UserLibrary";
import Search from "./search/Search";
import SpotifyAuth from "./SpotifyAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  //usestate's for our tokens
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState();
  const [userId, setUserId] = useState("");

  const code = new URLSearchParams(window.location.search).get("code");
  //function to add song to user's library

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
        localStorage.setItem("accessToken", data.accessToken);
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

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={
            code ? (
              <LoginPage userId={userId} setUserId={setUserId} />
            ) : (
              <SpotifyAuth />
            )
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home accessToken={accessToken} />} />
        <Route
          path="/library"
          element={<Library accessToken={accessToken} />}
        />
        <Route path="/search" element={<Search accessToken={accessToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
