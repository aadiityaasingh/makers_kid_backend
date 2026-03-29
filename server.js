const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();