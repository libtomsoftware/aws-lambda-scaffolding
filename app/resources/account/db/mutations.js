const AccountModel = require("./models/account");

module.exports = {
  updateAccount: accountData => {
    const account = AccountModel.findOne({
      email: accountData.email
    });

    return account.updateOne(accountData);
  },
  registerAccount: accountData => {
    const account = new AccountModel(accountData);

    return account.save();
  },
  removeAccount: id => {
    return AccountModel.deleteOne({
      _id: id
    });
  }
};
