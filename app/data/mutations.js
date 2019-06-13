const BookModel = require("./models/book");
const AuthorModel = require("./models/author");

module.exports = {
  addAuthor: ({ name, age }) => {
    const author = new AuthorModel({
      name,
      age
    });

    return author.save();
  },
  addBook: ({ title, genre, authorId }) => {
    const book = new BookModel({
      title,
      genre,
      authorId
    });

    return book.save();
  }
};
