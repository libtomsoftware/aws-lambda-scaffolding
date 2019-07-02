const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    _id: String,
    email: String,
    started: String,
    expiration: String,
    token: String
  },
  { collection: "sessions", strictQuery: true }
);

module.exports = mongoose.model("Session", sessionSchema);
