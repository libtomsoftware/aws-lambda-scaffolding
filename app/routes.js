const express = require("express");
const resources = require("./resources");

module.exports = function routes() {
  const routes = new express.Router();

  routes.get("/v1/version", (req, res) => res.send({ version: "1" }));
  routes.post("/v1/echo", (req, res) => res.send({ ...req.body }));

  resources.forEach(resource => {
    const handler = require("./resources/" + resource);

    routes.get(`/${resource}`, handler.get);
  });

  return routes;
};
