const express = require("express");
const responder = require("./responder");
const resources = {
  books: require("./resources/books"),
  book: require("./resources/book"),
  authors: require("./resources/authors"),
  author: require("./resources/author")
};

module.exports = function routes() {
  const routes = new express.Router();

  routes.get("/v1/version", (req, res) => res.send({ version: "1" }));
  routes.post("/v1/echo", (req, res) => res.send({ ...req.body }));

  routes.get("/books", resources.books.findAll);
  routes.get("/book/:id", resources.book.findById);

  routes.get("/authors", resources.authors.findAll);
  routes.get("/author/:id", resources.author.findById);

  routes.all("*", (req, res) => responder.rejectNotFound(res));

  return routes;
};
