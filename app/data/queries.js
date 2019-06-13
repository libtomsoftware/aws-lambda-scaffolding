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
  bookById: ({ id }) => {
    return BookModel.findById(id);
  },
  authors: () => {
    return AuthorModel.find({});
  },
  authorById: ({ id }) => {
    return AuthorModel.findById(id);
  }
};
