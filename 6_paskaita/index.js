const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const URI = 'mongodb+srv://admin:admin@cluster0.zviug2m.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(URI);

app.get('/', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie DB
    const data = await con.db('demo1').collection('cars').find().toArray(); // atliekame veiksmus
    // .find().toArray(); surandaa ir grazina visus elementus

    await con.close(); // atsijungiame
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo1').collection('cars').insertOne({ brand: 'VW', model: 'Passat' });
    // .insertOne prideda viena elementa

    await con.close();
    // return res.send(dbRes);//nereikia
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
