const Schema = require("mongoose").Schema;

module.exports = new Schema(
  {
    username: { type: String, required: true },
    jobId: { type: String, required: true },
  },
  { collection: "favorites" }
);
