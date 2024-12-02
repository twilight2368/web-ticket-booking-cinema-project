require("dotenv").config();

const appConfig = {
  port: process.env.APP_PORT || 8080,
};

module.exports = appConfig;
