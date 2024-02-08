const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(URI);

app.get('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo1').collection('pets').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/pets', async (req, res) => {
  try {
    const newPet = req.body;
    const con = await client.connect();
    const dbRes = await con.db('demo1').collection('pets').insertOne(newPet);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/pets/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const con = await client.connect();
    // {type: "dog"}
    const data = await con.db('demo1').collection('pets').find({ type }).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/pets/age/byoldest', async (req, res) => {
  try {
    const con = await client.connect();
    // {type: "dog"}
    const data = await con.db('demo1').collection('pets').find().sort({ age: -1 }).toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('demo1')
      .collection('pets')
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
