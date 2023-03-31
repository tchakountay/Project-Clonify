"use strict";

//import the needed node_modules
const express = require("express");
const morgan = require("morgan");

//exports of the handler functions

const {
    // getAllUsers,
    // getUserById,
    createUser
    // updateUser,
    // deleteUser
} = require("./handlers")

//const for the PORT
const PORT = process.env.PORT || 8000;

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

    //ENDPOINT to get the users

    //ENDPOINT to add a user
    .post("/api/users", (req, res) => createUser(req, res))

    // handle 404s
    .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
