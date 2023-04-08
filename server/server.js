"use strict";
//import the needed node_modules
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const morgan = require("morgan");
const cors = require("cors");

//exports of the handler functions
const {
    getUserById,
    createUser,
    validateUser
} = require("./handlers")

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  )

  .post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
  // handle 404s
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
