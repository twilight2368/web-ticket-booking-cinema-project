const app = require("./src/app");
const auth = require("./src/auth/auth");
const connectMongo = require("./src/models/connections/connectMongo");
const clc = require("cli-color");
const { port: appPort } = require("./src/configs/app.config");
const { port: authPort } = require("./src/configs/auth.config");

const initSystem = async () => {
  try {
    console.log("====================================");
    console.log("Start connecting Mongo database...");
    console.log("====================================");
    await connectMongo();

    console.log("====================================");
    console.log("Start auth server...");
    console.log("====================================");
    auth.listen(authPort, () => {
      console.log("====================================");
      console.log(
        "Auth is listen on:" + clc.green("http://localhost:" + authPort)
      );
      console.log("====================================");
    });

    console.log("====================================");
    console.log("Start app server...");
    console.log("====================================");
    app.listen(appPort, () => {
      console.log("====================================");
      console.log(
        "App is listen on:" + clc.green("http://localhost:" + appPort)
      );
      console.log("====================================");
    });
  } catch (error) {}
};

initSystem();
