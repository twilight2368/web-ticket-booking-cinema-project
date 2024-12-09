require("dotenv").config();

const authConfig = {
  jwt: {
    expiresIn: "1d",
    algorithm: "RS256",
  },
  secretSession: process.env.SECRET_SESSION || "hello world",
  secretHash: "",
  sessionTTL: 0,
  sessionCookieTTL: 1000 * 60 * 60 * 24 * 3, //"3d"
  saltRounds: 10,
  port: process.env.AUTH_PORT || 8000,
  admin_secret_password: process.env.SECRET_ADMIN_KEY,
  google_capcha_secret: process.env.SECRET_KEY_RECAPTCHA_GG,
};

module.exports = authConfig;
