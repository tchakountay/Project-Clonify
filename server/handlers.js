"use strict";
const { MongoClient } = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const { v4: uuidv4 } = require("uuid");
// creates a new user
const createUser = async (req, res) => {
}



module.exports = async () => {
    createUser
};