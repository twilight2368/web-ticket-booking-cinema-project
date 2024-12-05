require("dotenv").config();

const databaseConfig = {
  stringConnect: process.env.DEV_MONGO_CONNECT_STRING,
  post: process.env.DEV_MONGO_PORT,
  database: process.env.DEV_MONGO_DATABASE_NAME,
  username: "",
  password: "",
  database: "",
};

module.exports = databaseConfig;
