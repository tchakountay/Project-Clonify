"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

//SERVER LOGIN VALIDATION Handler function
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

    const user = await userCollection.findOne({
      email: userInput.email,
      password: userInput.password
    })

    if (user) {
      res.status(200).json({ status: 200, data: user });
    } else {
      // if user is null, it means the user was not found in the database
      res.status(400).json({
        error: "user_undefined",
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

//NEW USER HANDLER FUNCTION
const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("users_db");

    const userInput = req.body;
    let validateUser = false;
    let existingUser = false;

    const userCollection = db.collection("users");

    const users = await userCollection.find().toArray();

    //Validate if the user already exists or not (based on email)
    users.forEach((user) => {
      if (user.email === userInput.email) {
        existingUser = true;
        res.status(401).json({
          error: "email_taken",
          status: "error",
          message: "This user already exists",
        });
        console.log("user already exists");
      } else if (user.email !== userInput.email) {
        existingUser = false;
      }
    });

    //Validate if the email used is valid or not
    if (userInput.email.includes("@") === false) {
      res.status(400).json({
        error: "invalid_email",
        status: "error",
        message: "Please enter a valid email",
      });
    }
    //validates if the password is long enough
    else if (userInput.password.length < 8) {
      res.status(400).json({
        error: "password_too_short",
        status: "error",
        message: "Password must be at least 8 characters",
      });
    }
    //validates if the password matches the confirmation password
    else if (userInput.password !== userInput.confirmPassword) {
      res.status(400).json({
        error: "password_mismatch",
        status: "error",
        message: "Passwords do not match",
      });
    } else {
      validateUser = true;
    }

    if (validateUser === true && existingUser === false) {
      const newUser = {
        _id: uuidv4(),
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
        password: userInput.password,
      };
      const result = await userCollection.insertOne(newUser);
      console.log(`Added ${newUser.firstName} ${newUser.lastName} to database`);
      
      res.status(200).json({ status: 200, data: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error creating account" });
  } finally {
    await client.close();
  }
};

//GET USER BY ID HANDLER FUNCTION
const getUserById = async (req, res, userId) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected successfully to server");

    const user = await client.db("users_db").collection("users").findOne({ _id: userId});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  }
  catch (error) {
  }
  finally {
    await client.close();
    console.log("Connection closed");
  }
}
module.exports = {
  validateUser,
  createUser,
  getUserById
};
