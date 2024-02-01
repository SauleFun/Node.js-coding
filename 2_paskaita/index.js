const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

// susikuriame defaultini API
app.get("/", (req, res) => {
  res.send("OK");
});

const brands = ["BMW", "VW", "Porsche"];

app.get("/brands", (req, res) => {
  res.send(brands);
});

// /brands/B => ["BMW"];
// /brands/g => [];
// /brands/b =>
// dinaminis route
app.get("/brands/:firstLetter", (req, res) => {
  // grazinti visus brandus kurie prasideda duota raide
  console.log(req.params);
  // const firstLetter = req.params.firstLetter; old way/another way
  const { firstLetter } = req.params; // su dvitaskiu einantys parameterai (dinaminiai laukai);
  console.log(firstLetter);
  const filteredBrands = brands.filter(
    (brand) => brand[0].toLowerCase() === firstLetter.toLowerCase()
  );

  res.send(brands);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
