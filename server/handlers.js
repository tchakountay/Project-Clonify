"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

//SERVER VALIDATION Handler function

const validateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //connection to the database
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("users_db");

    //the user's input in the Login form
    const userInput = req.body;
    let validateUser = false;

    //collection of users
    const userCollection = db.collection("users");

    const users = await userCollection.find().toArray();

    users.forEach((user) => {
      if (user.email === userInput.email && user.password === userInput.password) {
        validateUser = true;
      } else if (user.email !== userInput.email) {
        validateUser = false;
      }
    });

    if (validateUser === false) {
      res.status(404)
      .json({
        error: "invalid credentials",
        status: "error",
        message: "Invalid credentials"
      })
    }
    else if (userInput.email.includes("@") === false){
      res
      .status(400)
      .json({
        error: "missing data",
        status: "error",
        message: "Please enter a valid email"
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

// creates a new user
// const createUser = async (req, res) => {};

module.exports = {
  validateUser
};
