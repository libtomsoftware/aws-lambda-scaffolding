const mutations = require("./db/mutations");
const queries = require("./db/queries");
const responder = require("../../responder");
const helpers = require("../../helpers");

async function registerNewAccount(
  { firstname, lastname, email, password, roleId },
  res,
  origin
) {
  const salt = helpers.generateRandomString(5, true);
  const encodedPassword = helpers.encodePassword(password, salt);
  const account = {
    _id: helpers.encodeBase64(email, salt),
    activated: false,
    firstname,
    lastname,
    email,
    password: encodedPassword,
    roleId: roleId || 5,
    salt,
    registered: helpers.getCurrentTimestamp()
  };

  try {
    await mutations.registerAccount(account);

    responder.sendSuccess(res, origin);
  } catch (error) {
    console.error("Error", error);
    responder.rejectBadGateway(response, origin);
  }
}

module.exports = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const { origin } = req.headers;

  if (!firstname || !lastname || !email || !password) {
    responder.rejectBadRequest(res, origin);

    return;
  }

  const existingAccount = await queries.accountByEmail(email);

  if (existingAccount) {
    responder.rejectConflict(res, origin);

    return;
  }

  registerNewAccount(req.body, res, origin);
};
