require("dotenv").config();

const cors = require('cors');
const express = require('express');
const server = express();
const config = require("./config");

const mainRouter = require("./router/main");

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_KEY)
  .then(() => {
    console.log("DB CONNECTION SUCCESS")
  }).catch(e => {
  console.log(e)
});

server.use(express.json());
server.use(cors());
server.use("/", mainRouter);

server.listen(config.config.server.port, () => {
  console.log(`server is running on: http://${config.config.server.domain}:${config.config.server.port}`);
});