const app = require("./src/app");
const connectMongo = require("./src/models/connections/connectMongo");
const clc = require("cli-color");
const { port: PORT } = require("./src/configs/app.config");

const initSystem = async () => {
  try {
    await connectMongo();

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
