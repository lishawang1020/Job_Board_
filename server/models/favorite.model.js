const mongoose = require("mongoose");
const FavoriteSchema = require("../schemas/favorite.schema");
const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

function addFavorite(fav) {
  return FavoriteModel.create(fav);
}

function getFavoritesByUsername(username) {
  return FavoriteModel.find({ username: username }).exec();
}

function getFavoritesByUsernameAndJobId(username, jobId) {
  return FavoriteModel.find({ username: username, jobId: jobId }).exec();
}

function deleteFavoritesByUsernameAndJobId(username, jobId) {
  return FavoriteModel.deleteOne({ username: username, jobId: jobId }).exec();
}

function deleteFavoritesByJobId(jobId) {
  return FavoriteModel.deleteMany({ jobId: jobId }).exec();
}

module.exports = {
  addFavorite,
  getFavoritesByUsername,
  getFavoritesByUsernameAndJobId,
  deleteFavoritesByUsernameAndJobId,
  deleteFavoritesByJobId,
};
