require("dotenv").config();

const authConfig = {
  secretSession: process.env.SECRET_SESSION || "hello world",
  secretHash: "",
  sessionTTL: 0,
  saltRounds: 10,
  port: process.env.AUTH_PORT || 8000,
};

module.exports = authConfig;
