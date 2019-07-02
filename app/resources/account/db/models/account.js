const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    _id: String,
    activated: Boolean,
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    registered: String,
    roleId: Number,
    phone: String,
    salt: String,
    updated: String
  },
  { collection: "accounts", strictQuery: true }
);

module.exports = mongoose.model("Account", accountSchema);
