const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const createUser = asyncHandler(async (req, res) => {

  const {name, email, password} = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    if (error.code === 11000) {
      throw new AppError("User already exists", 400);
    }

    throw error;
  }

});

module.exports = {
  createUser,
};