const queries = require("../../data/queries");

function findById(req, res) {
  const query = queries.authorById({
    id: req.params.id
  });

  query.exec((error, author) => {
    res.send({ author });
  });
}

module.exports = {
  findById
};
