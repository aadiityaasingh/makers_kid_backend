const express = require("express");
const app = express();  
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const feedbackRoutes = require("./routes/feedback.route.js");
const contactRoutes = require("./routes/contact.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);



module.exports = app;