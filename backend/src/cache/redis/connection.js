const { createClient } = require("redis");
const clc = require("cli-color");
const { redis } = require("../../configs/database.config");
const client = createClient({
  username: redis.config.username,
  password: redis.config.password,
  socket: {
    host: redis.config.socket.host,
    port: redis.config.socket.port,
  },
});
// Set up Redis connection at application startup
client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.on("ready", () => {
  console.log("====================================");
  console.log(clc.green("Redis client connected and ready to use."));
  console.log("====================================");
});

async function connectRedis() {
  try {
    console.log("====================================");
    console.log(clc.blue("Connecting to Redis ..."));
    console.log("====================================");

    //todo: Connect once when the app starts
    await client.connect();
  } catch (err) {
    console.error(error);
  }
}

module.exports = { client, connectRedis };
