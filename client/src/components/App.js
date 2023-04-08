import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./homepage/Homepage";
import Welcome from "./WelcomePage";
import Home from "./homefeed/Home";
import Search from "./search/Search";
import SpotifyAuth from "./SpotifyAuth";
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [userId, setUserId] = useState("");

  //TRYING
  const code = new URLSearchParams(window.location.search).get("code");
  //Use State to register access token
  // const [accessToken, setAccessToken] = useState("");

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={code ? <Homepage code={code} userId={userId} setUserId={setUserId} /> : <SpotifyAuth /> }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/search" element={<Search accessToken={accessToken} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
