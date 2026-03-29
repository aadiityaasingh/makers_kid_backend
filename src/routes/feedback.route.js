const express = require("express");
const {
  createFeedback,
  getAllFeedbacks,
} = require("../controllers/feedback.controller.js");

const router = express.Router();

router.post("/", createFeedback);

router.get("/", getAllFeedbacks);

module.exports = router;