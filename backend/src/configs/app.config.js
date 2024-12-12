require("dotenv").config();

const appConfig = {
  port: process.env.APP_PORT || 8080,
  dev_mode: process.env.NODE_ENV == "development" ? true : false,
  client_url: process.env.CLIENT_URL,
  cloudinary: {
    config: {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    folder: process.env.CLOUDINARY_FOLDER_NAME,
    image: {
      default_poster_movie:
        "https://res.cloudinary.com/dy2xmyytw/image/upload/v1733622170/82648f28c011896cd0128956e8ebf230_aw3mzu.jpg",
    },
  },
  stripe: {
    private_key: process.env.STRIPE_PRIVATE_KEY,
  },
  nodemailer: {
    email_from: process.env.EMAIL_FROM,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASSWORD_GG,
    },
  },
};

module.exports = appConfig;
