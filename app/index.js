const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const { MONGODB_CONNECTION_STRING } = process.env;

mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB...");
});
app.use(bodyParser.json());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(routes());

module.exports = app;
