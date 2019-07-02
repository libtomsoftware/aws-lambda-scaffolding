const AccountModel = require("./models/account");

module.exports = {
  accountById: id => {
    return AccountModel.findOne({
      _id: id
    });
  },
  accountByEmail: email => {
    return AccountModel.findOne({
      email
    });
  },
  accounts: () => {
    return AccountModel.find({});
  }
};
