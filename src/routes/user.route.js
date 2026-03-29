const express = require("express");

const { createUser } = require("../controllers/user.controller.js");
// const { createUserValidation } = require("../validation/user.validation.js");
// const validate = require("../middlewares/validate.js");
const router = express.Router();


router.post(
  "/",
  createUser
);

module.exports = router;