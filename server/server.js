"use strict";
//import the needed node_modules
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

//exports of the handler functions
const { 
  getUserById, 
  createUser, 
  validateUser, 
  getUserLibrary,
  createUserLibrary,
  addSongToLibrary,
  removeSongFromLibrary } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(bodyParser.json())
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type"],
    })
  )

  //SPOTIFY REFRESH TOKEN ENDPOINT
.post("/spotifyrefresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

  //SPOTIFY SERVER LOGIN ENDPOINT
  .post("/spotifylogin", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: "http://localhost:3000",
    });
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(() => {
        res.status(400);
      });
  })

  //SERVER LOGIN VALIDATION ENDPOINT
  .post("/api/login", (req, res) => validateUser(req, res))

  //SERVER REGISTER ENDPOINT
  .post("/api/register", (req, res) => createUser(req, res))

  //SERVER USER DATA ENDPOINT
  .get("/api/get-user/:userId", (req, res) =>
    getUserById(req, res, req.params.userId)
  )

  //SERVER ENDPOINT TO CREATE USER LIBRARY
  .post("/api/create-user-library/:userId", createUserLibrary)

  //SERVER ENDPOINT TO ADD SONG TO LIBRARY
  .post("/api/add-song-to-library/:userId", addSongToLibrary)

  //SERVER ENDPOINT TO GET USER LIBRARY
  .get("/api/get-user-library/:userId", getUserLibrary)

  //SERVER ENDPOINT TO DELETE SONG FROM LIBRARY
  .patch("/api/get-song-from-library/:userId/:songId", removeSongFromLibrary)
  
  // handle 404s
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
