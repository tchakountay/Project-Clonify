"use strict";

//import the needed node_modules
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors")

//exports of the handler functions

const {
    // getAllUsers,
    // getUserById,
    // createUser,
    validateUser
    // updateUser,
    // deleteUser
} = require("./handlers")

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.json())
    // .use(express.urlencoded({ extended: false }))
    // .use("/", express.static(__dirname + "/"))

    //SERVER VALIDATION ENDPOINT
    .post("/api/users", (req, res) => validateUser(req, res))

    //ENDPOINT to get the users

    //ENDPOINT to add a user
    // .post("/api/users", (req, res) => createUser(req, res))

    // handle 404s
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    .listen(8000, () => console.log(`Listening on port 8000`));
