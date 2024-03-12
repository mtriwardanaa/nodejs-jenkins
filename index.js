require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const redis = require("redis");
const port = 9009;

const mongoString = process.env.DATABASE_URL;
const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: `redis://:@${redisHost}:${redisPort}`
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

  console.log('Redis Connected')
})();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Hello Welcome to Redis Cache DB and ${process.env.APP_NAME} </h1>`);
});

app.listen(port, () => {
  console.log(`Server Started at ${port} develop test inter`)
})
