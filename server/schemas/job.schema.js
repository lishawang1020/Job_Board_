const Schema = require("mongoose").Schema;

module.exports = new Schema(
  {
    jobTitle: { type: String, index: true, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    employerEmail: { type: String, required: true },
    companyWebsite: String,
    timestamp: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
  },
  { collection: "jobs" }
);
