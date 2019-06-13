const queries = require("../../data/queries");
const responder = require("../../responder");

function findById(req, res) {
  const query = queries.bookById({
    id: req.params.id
  });

  query.exec((error, book) => {
    responder.send(res, req.origin, { book });
  });
}

module.exports = {
  findById
};
