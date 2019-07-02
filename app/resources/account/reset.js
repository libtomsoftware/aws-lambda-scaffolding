const mutations = require("./db/mutations");
const queries = require("./db/queries");
const responder = require("../../responder");
const helpers = require("../../helpers");

function generatePassword(salt) {
  const newPasswordDecoded =
    helpers.generateRandomString(2) + helpers.generateRandomString(3, true);
  const newPasswordEncoded = helpers.encodePassword(newPasswordDecoded, salt);

  return {
    newPasswordEncoded,
    newPasswordDecoded
  };
}

async function resetPassword(account, res, origin) {
  const { passwordDecoded, passwordEncoded } = helpers.generatePassword(
    account.salt
  );

  try {
    await mutations.updateAccount({
      email: account.email,
      password: passwordEncoded
    });

    // TODO - send email with new password instead of returning it in response
    responder.send(res, origin, { password: passwordDecoded });
  } catch (error) {
    console.error("Error", error);
    responder.rejectBadGateway(response, origin);
  }
}

module.exports = async (req, res) => {
  const { email } = req.body;
  const { origin } = req.headers;

  if (!email) {
    responder.rejectBadRequest(res, origin);

    return;
  }

  const account = await queries.accountByEmail(email);

  if (!account) {
    responder.rejectNotFound(res, origin);

    return;
  }

  resetPassword(account, res, origin);
};
