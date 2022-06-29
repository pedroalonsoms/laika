const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, unique: true },
  phone: String,
  address: String,
  organization: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { userSchema, User };
