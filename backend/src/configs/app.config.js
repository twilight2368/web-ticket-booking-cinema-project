require("dotenv").config();

const appConfig = {
  port: process.env.APP_PORT || 8080,
  dev_mode: process.env.NODE_ENV == "development" ? true : false,
  client_url: [process.env.CLIENT_URL],
  cloudinary: {
    config: {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    folder: "web-booking-upload",
  },
};

module.exports = appConfig;
