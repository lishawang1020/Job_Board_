const mongoose = require("mongoose");
const UserSchema = require("../schemas/user.schema");
const UserModel = mongoose.model("User", UserSchema);

function addUser(user) {
  return UserModel.create(user);
}

function getUseByUserName(username) {
  return UserModel.findOne({ username: username }).exec();
}

function getAllUsers() {
  return UserModel.find().exec();
}

module.exports = {
  addUser,
  getUseByUserName,
  getAllUsers,
};
