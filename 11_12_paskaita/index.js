const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const URI =
  "mongodb+srv://admin:admin@cluster0.zviug2m.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
