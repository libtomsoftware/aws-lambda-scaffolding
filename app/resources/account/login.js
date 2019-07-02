const moment = require("moment");
const queries = require("./db/queries");
const sessionMutations = require("../sessions/db/mutations");
const responder = require("../../responder");
const helpers = require("../../helpers");

async function authenticateAccount({ password }, account, res, origin) {
  const encodedPasswordProvided = helpers.encodePassword(
    password,
    account.salt
  );

  if (encodedPasswordProvided !== account.password) {
    responder.rejectUnauthorized(res, origin);

    return;
  }

  const expiration = moment()
    .add(5, "minutes")
    .toISOString();
  const token = helpers.generateToken(
    account.email,
    account.roleId,
    expiration
  );

  await sessionMutations.addSession({
    _id: helpers.generateRandomString(15, true),
    email: account.email,
    started: moment(),
    expiration,
    token
  });

  responder.send(
    res,
    origin,
    { token, user: { email: account.email }, expiration },
    200
  );
}

module.exports = async (req, res) => {
  const { username, password } = req.body;
  const { origin } = req.headers;

  if (!username || !password) {
    responder.rejectBadRequest(res, origin);

    return;
  }

  const account = await queries.accountByEmail(username);

  if (!account) {
    responder.rejectNotFound(res, origin);

    return;
  }

  authenticateAccount(req.body, account, res, origin);
};
