const mutations = require("./db/mutations");
const queries = require("./db/queries");
const responder = require("../../responder");

async function updateAccount(accountData, res, origin) {
  try {
    await mutations.updateAccount(accountData);

    responder.sendSuccess(res, origin);
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

  const existingAccount = await queries.accountByEmail(email);

  if (!existingAccount) {
    responder.rejectNotFound(res, origin);

    return;
  }

  updateAccount(req.body, res, origin);
};
