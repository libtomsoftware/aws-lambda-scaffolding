const express = require("express");
const responder = require("./responder");
const resources = require("./resources");
const { account, sessions } = resources;

module.exports = function routes() {
  const routes = new express.Router();

  routes.put("/register", account.register);
  routes.post("/login", account.login);
  routes.post("/logout", account.logout);
  routes.post("/update", account.update);
  routes.post("/reset", account.reset);
  routes.delete("/remove/:account_id", account.remove);

  routes.get("/session/:token", sessions.token);

  routes.all("*", (req, res) => responder.rejectNotFound(res));

  return routes;
};
