const express = require("express"); // importuojam express
const cors = require("cors");

const app = express(); // sukuriam express aplikaciją
const port = 3000;

app.use(cors());
app.use(express.json()); // pasako, jog musu aplikacija bendraus JSON formatu

// susikuriame defaultini API
app.get("/", (req, res) => {
  res.send("OK");
});
