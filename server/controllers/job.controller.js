const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authParser = require("../middleware/auth");

const JobModel = require("../models/job.model");
const FavoriteModel = require("../models/favorite.model");

router.post("/", authParser, (req, res) => {
  const {
    jobTitle,
    company,
    location,
    description,
    employerEmail,
    companyWebsite,
  } = req.body;
  if (!jobTitle || !company || !location || !description || !employerEmail) {
    return res.status(404).send({ message: "Required fields not included" });
  }
  return JobModel.addJob(req.body).then((job) => {
    if (job) {
      res.status(200).send(job);
    } else {
      res.send(500).send({ message: "Error creating job post" });
    }
  });
});

router.put("/", authParser, (req, res) => {
  const {
    jobTitle,
    company,
    location,
    description,
    employerEmail,
    companyWebsite,
  } = req.body;
  if (!jobTitle || !company || !location || !description || !employerEmail) {
    return res.status(404).send({ message: "Required fields not included" });
  }
  JobModel.updateJob(req.body).then((job) => {
    if (job) {
      res.status(200).send(job);
    } else {
      res.send(500).send({ message: "Error updating job post" });
    }
  });
});

router.get("/search/:serchWord", (req, res) => {
  const prefix = req.params.serchWord;
  JobModel.getJobsByPrefix(prefix).then((jobs) => {
    res.send(jobs);
  });
});

router.get("/detail/:jobId", (req, res) => {
  const jobId = req.params.jobId;
  JobModel.getJobById(jobId).then((job) => {
    res.send(job);
  });
});

router.get("/", (req, res) =>
  JobModel.getAllJobs().then((jobs) => res.send(jobs))
);

router.delete("/:jobId", authParser, (req, res) => {
  const jobId = req.params.jobId;
  JobModel.deleteJob(jobId).then(
    (success) => {
      FavoriteModel.deleteFavoritesByJobId(jobId).then(
        (success) => res.send(200).send(success),
        (error) => res.send(500).send(error)
      );
    },
    (error) => res.send(500).send(error)
  );
});

module.exports = router;
