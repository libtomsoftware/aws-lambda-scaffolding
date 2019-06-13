const BookModel = require("./models/book");
const AuthorModel = require("./models/author");

module.exports = {
  books: () => {
    return BookModel.find();
  },
  booksOfAuthor: ({ authorId }) => {
    return BookModel.find({
      authorId
    });
  },
  book: ({ id }) => {
    return BookModel.findById(id);
  },
  authors: () => {
    return AuthorModel.find({});
  },
  author: ({ id }) => {
    return AuthorModel.findById(id);
  }
};
