const queries = require("../../data/queries");

function findAll(req, res) {
  const query = queries.authors();

  query.exec((error, authors) => {
    res.send({ authors });
  });
}

module.exports = {
  findAll
};
