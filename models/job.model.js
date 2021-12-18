const mongoose = require("mongoose");
const JobSchema = require("../schemas/job.schema");
const JobModel = mongoose.model("Job", JobSchema);

function addJob(job) {
  return JobModel.create(job);
}

function updateJob(job) {
  return JobModel.findOneAndUpdate({ _id: job._id }, job, {
    new: true,
  }).exec();
}

function getJobById(id) {
  return JobModel.findOne({ _id: id }).exec();
}

function getJobsByPrefix(prefix) {
  let regex = new RegExp(["^", prefix].join(""), "i");
  console.log(regex);
  return JobModel.find({ jobTitle: regex }).exec();
}

function getAllJobs() {
  return JobModel.find().exec();
}

function deleteJob(id) {
  return JobModel.deleteOne({ _id: id }).exec();
}

module.exports = {
  addJob,
  updateJob,
  getJobById,
  getJobsByPrefix,
  getAllJobs,
  deleteJob,
};
