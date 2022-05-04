import express from 'express';
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded());


import { MongoClient, ObjectId } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();





//Lyssna - längst ned
app.listen(port, () => console.log(`Listening on ${port}`));