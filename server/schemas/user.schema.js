const Schema = require("mongoose").Schema;

module.exports = new Schema(
  {
    username: { type: String, index: true, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);
