import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./homepage/Homepage";
import Welcome from "./WelcomePage";
import Home from "./homefeed/Home";
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [userId, setUserId] = useState("");
  //Spotify API client ID and client secret
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  console.log(CLIENT_ID);
  console.log(CLIENT_SECRET);
  //Use State to register access token
  const [accessToken, setAccessToken] = useState("");

  //Use Effect for getting the access token
  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    //fetch the access token
    const refreshAccessToken = () => {
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => {
        console.log("Response from API:", result);
        return result.json();
      })
      .then((data) => {
        setAccessToken(data.access_token);
        console.log("Data from API:", data);
      })
      .catch((error) => console.error(error));
  }; 
  
  console.log(accessToken);
  refreshAccessToken();
  
  const interval = setInterval(() => {
    refreshAccessToken();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
}, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Homepage userId={userId} setUserId={setUserId} />} />
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
