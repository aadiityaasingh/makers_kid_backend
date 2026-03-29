const express = require("express");
const app = express();  
const authRoutes = require("./routes/auth.route.js");
const feedbackRoutes = require("./routes/feedback.route.js");
const contactRoutes = require("./routes/contact.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "https://your-frontend.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);



module.exports = app;