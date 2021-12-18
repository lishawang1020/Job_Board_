const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

router.post("/authenticate", function (req, res) {
  const { username, password } = req.body;
  if (!req.body.username || !req.body.password) {
    return res
      .status(404)
      .send({ message: "Must include username AND password" });
  }
  UserModel.getUseByUserName(username).then((user) => {
    if (user.password === req.body.password) {
      const payload = { username };
      const token = jwt.sign(payload, "" + process.env.SUPER_SECRET, {
        expiresIn: "14d",
      });
      res.cookie("token", token, { httpOnly: true }).status(200).send(user);
    } else {
      res.status(404).send("Failed to authenticate user!");
    }
  });
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!req.body.username || !req.body.password) {
    return res
      .status(404)
      .send({ message: "Must include username AND password" });
  }

  UserModel.getUseByUserName(req.body.username).then((user) => {
    if (!user) {
      const payload = { username };
      const token = jwt.sign(payload, "" + process.env.SUPER_SECRET, {
        expiresIn: "14d",
      });
      return UserModel.addUser(req.body).then(
        (success) =>
          res
            .cookie("token", token, { httpOnly: true })
            .send(200)
            .send({ username }),
        (error) => res.send(500).send(error)
      );
    } else {
      return res.send(409).send({ message: "Username already exists" });
    }
  });
});

router.get("/", (req, res) =>
  UserModel.getAllUsers().then((users) => res.send(users))
);

module.exports = router;
