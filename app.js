const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function apiRoutes() {
  const routes = new express.Router();

  routes.get("/v1/version", (req, res) => res.send({ version: "1" }));
  routes.post("/v1/echo", (req, res) => res.send({ ...req.body }));

  return routes;
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(apiRoutes());

module.exports = app;
