const express = require("express");
const app = express();
const morgan = require("morgan");
const apiRoutes = require("./routes/app.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandling = require("./middlewares/errorHandling");

//* Global Middlewares
app.use(morgan("dev"));
app.use(morgan("combined"));

//* Custom global middlewares

app.use("/auth", authRoutes);

app.use("/api", apiRoutes);

app.use(errorHandling);

module.exports = app;
