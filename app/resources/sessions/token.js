const moment = require("moment");
const mutations = require("./db/mutations");
const queries = require("./db/queries");
const responder = require("../../responder");

module.exports = async (req, res) => {
  const { token } = req.params;
  const { origin } = req.headers;

  if (!token) {
    responder.rejectBadRequest(res, origin);

    return;
  }

  const session = await queries.sessionByToken(token);

  if (!session || !session.expiration) {
    responder.rejectNotFound(res, origin);

    return;
  }

  const { expiration } = session;
  const isExpired = moment().isAfter(expiration);

  if (isExpired) {
    responder.rejectUnauthorized(res, origin);

    return;
  }

  responder.send(res, origin, session, 200);
};
