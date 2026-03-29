const express = require("express");
const app = express();  
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/auth.route.js");
const feedbackRoutes = require("./routes/feedback.route.js");
const contactRoutes = require("./routes/contact.route.js");


app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);



module.exports = app;