const SessionModel = require("./models/session");

module.exports = {
  addSession: sessionData => {
    const session = new SessionModel(sessionData);

    return session.save();
  },
  removeSession: email => {
    return SessionModel.deleteOne({
      email
    });
  }
};
