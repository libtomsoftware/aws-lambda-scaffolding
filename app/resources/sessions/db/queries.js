const SessionModel = require("./models/session");

module.exports = {
  sessionByEmail: email => {
    return SessionModel.findOne({
      email
    });
  },
  sessionByToken: token => {
    return SessionModel.findOne({
      token
    });
  },
  sessions: () => {
    return SessionModel.find({});
  }
};
