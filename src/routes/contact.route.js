const express = require("express");
const { sendContactMessage } = require("../controllers/contact.controller.js");

const router = express.Router();

// POST - send message
router.post("/", sendContactMessage);

module.exports = router;