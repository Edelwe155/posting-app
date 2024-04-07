const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: String,
  email: { type: String, unique: true },
  pass: String,
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
