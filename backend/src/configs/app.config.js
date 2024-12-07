require("dotenv").config();

const appConfig = {
  port: process.env.APP_PORT || 8080,
  dev_mode: process.env.NODE_ENV == "development" ? true : false,
  client_url: [process.env.CLIENT_URL],
  cloudinary: {},
};

module.exports = appConfig;
