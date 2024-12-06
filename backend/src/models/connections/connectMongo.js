const mongoose = require("mongoose");
const databaseConfig = require("../../configs/database.config");
const clc = require("cli-color");

//TODO: Import all models to initialize the database
require("../index");

const connnectMongo = async () => {
  try {
    console.log(clc.blue("Connecting to MongoDB ..."));

    await mongoose.connect(databaseConfig.stringConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("====================================");
    console.log(clc.green("Connection MongoDB Success"));
    console.log("====================================");
  } catch (error) {
    console.log("====================================");
    console.log(clc.red("Connection MongoDB failed"));
    console.log("====================================");
  }
};

module.exports = connnectMongo;
