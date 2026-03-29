const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

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
  login,logout
};