require("dotenv").config();

const authConfig = {
  secretSession: "",
  secretHash: "",
  sessionTTL: 0,
  port: process.env.AUTH_PORT || 8000,
};

module.exports = authConfig;
