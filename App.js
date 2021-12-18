const express = require("express");
const app = express();
const userController = require("./controllers/user.controller");
const jobController = require("./controllers/job.controller");
const FavoriteController = require("./controllers/favorite.controller");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const mongoEndpoint =
  "mongodb+srv://root:Hello1234@cluster0.kwjat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
const db = mongoose.connection;
console.log(db);
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/job", jobController);
app.use("/api/user", userController);
app.use("/api/favorite", FavoriteController);

module.exports = app;
