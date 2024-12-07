require("dotenv").config();

const databaseConfig = {
  stringConnect: process.env.DEV_MONGO_CONNECT_STRING,
  post: process.env.DEV_MONGO_PORT,
  database: process.env.DEV_MONGO_DATABASE_NAME,
  redis: {
    config: {
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: 11043,
      },
    },
    default_expire_time: 6000,
  },
};

module.exports = databaseConfig;
