const sessionQueries = require("../sessions/db/queries");
const sessionMutations = require("../sessions/db/mutations");
const responder = require("../../responder");

async function removeSession(email, res, origin) {
  try {
    await sessionMutations.removeSession(email);

    responder.sendSuccess(res, origin);
  } catch (error) {
    console.error("Error", error);
    responder.rejectBadGateway(res, origin);
  }
}

module.exports = async (req, res) => {
  const { email } = req.body;
  const { origin } = req.headers;

  if (!email) {
    responder.rejectBadRequest(res, origin);

    return;
  }

  const session = await sessionQueries.sessionByEmail(email);

  if (!session) {
    responder.rejectNotFound(res, origin);

    return;
  }

  removeSession(session.email, res, origin);
};
