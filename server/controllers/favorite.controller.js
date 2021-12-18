const express = require("express");
const router = express.Router();
const FavoriteModel = require("../models/favorite.model");
const authParser = require("../middleware/auth");

router.post("/", authParser, (req, res) => {
  const { username, jobId } = req.body;
  if (!username || !jobId) {
    return res
      .status(404)
      .send({ message: "Username and job Id info not complete" });
  }
  return FavoriteModel.addFavorite(req.body).then(
    (success) => res.send(200).send(success),
    (error) => res.send(500).send(error)
  );
});

router.get("/user/:username", authParser, (req, res) => {
  console.log("inside fav");
  const username = req.params.username;
  FavoriteModel.getFavoritesByUsername(username).then((favorites) => {
    res.send(favorites);
  });
});

router.get("/fav/:jobId/:username", (req, res) => {
  const username = req.params.username;
  const jobId = req.params.jobId;
  FavoriteModel.getFavoritesByUsernameAndJobId(username, jobId).then(
    (favorites) => {
      res.send(favorites);
    }
  );
});

router.delete("/fav/:jobId/:username", authParser, (req, res) => {
  const username = req.params.username;
  const jobId = req.params.jobId;
  FavoriteModel.deleteFavoritesByUsernameAndJobId(username, jobId).then(
    (success) => res.send(200).send(success),
    (error) => res.send(500).send(error)
  );
});

module.exports = router;
