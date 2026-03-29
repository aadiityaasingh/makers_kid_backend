const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("DB connected");
    } catch (err) {
        console.error("Mongo error:", err.message);
        process.exit(1); // stop app if DB fails
    }
};

module.exports = connectDB;