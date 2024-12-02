const express = require("express");
const app = express();
const apiRoutes = require("./routes/app.routes");
const errorHandling = require("./middlewares/errorHandling");

//app.use("/auth", undefined);

app.use("/api", apiRoutes);

app.use(errorHandling);

module.exports = app;
