const queries = require("../../data/queries");

function get(req, res) {
  const query = queries.authors();

  query.exec((error, authors) => {
    res.send({ authors });
  });
}

module.exports = {
  get
};
