const app = require("./src/app");
const connectMongo = require("./src/models/connections/connectMongo");
const { connectRedis } = require("./src/cache/redis/connection");
const clc = require("cli-color");
const { port: PORT } = require("./src/configs/app.config");

const initSystem = async () => {
  try {
    await connectMongo();
    await connectRedis();
    

    app.listen(PORT, () => {
      console.log("====================================");
      console.log(
        "Server is listen on:" + clc.green("http://localhost:" + PORT)
      );
      console.log("====================================");
    });
  } catch (error) {}
};

initSystem();
