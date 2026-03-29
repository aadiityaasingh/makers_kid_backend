const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");


const register = asyncHandler(async (req, res) => {

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

const login = asyncHandler(async (req, res) => {

  const {email, password} = req.body;

  const user = await userModel
    .findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const tokenData = {
    id: user._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

  res.status(200)
  .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });

});

const logout = asyncHandler(async (req, res) => {
  res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logout successfully",
    success: true,
  });
});

module.exports = {
  register, login,logout
};