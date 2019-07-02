const mutations = require("./db/mutations");
const queries = require("./db/queries");
const responder = require("../../responder");

async function removeAccount(id, res, origin) {
  try {
    await mutations.removeAccount(id);
    responder.sendSuccess(res, origin);
  } catch (error) {
    console.error("Error", error);
    responder.rejectBadGateway(res, origin);
  }
}

module.exports = async (req, res) => {
  const { account_id } = req.params;
  const { origin } = req.headers;

  if (!account_id) {
    responder.rejectBadRequest(res, origin);

    return;
  }

  const existingAccount = await queries.accountById(account_id);

  if (!existingAccount) {
    responder.rejectNotFound(res, origin);

    return;
  }

  removeAccount(id, res, origin);
};
