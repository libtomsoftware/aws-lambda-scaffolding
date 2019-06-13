const queries = require("../../data/queries");
const responder = require("../../responder");

function get(req, res) {
  const query = queries.books();

  query.exec((error, books) => {
    responder.send(res, req.origin, { books });
  });
}

module.exports = {
  get
};
