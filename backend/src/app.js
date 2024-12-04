const express = require("express");
const app = express();
const morgan = require("morgan");
const apiRoutes = require("./routes/app.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandling = require("./middlewares/errorHandling");
const logger = require("./logging/tools/logger");
//* Global Middlewares

//* Logging middlewares

//TODO: Create Morgan middlewares that logs the console
app.use(morgan("dev"));
app.use(morgan("combined"));

//TODO: Create a Morgan stream that writes logs file with Winston
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
app.use(morgan("combined", { stream: morganStream }));

//* Custom global middlewares

//* ---------- Routes ------------

app.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

app.use("/auth", authRoutes);

app.use("/api", apiRoutes);

app.use(errorHandling);

module.exports = app;
