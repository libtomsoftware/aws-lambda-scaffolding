const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

mongoose.connect(
  "mongodb://libtom:Password1@ds263295.mlab.com:63295/libtom-graphql-warmup",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB...");
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(routes());

module.exports = app;
