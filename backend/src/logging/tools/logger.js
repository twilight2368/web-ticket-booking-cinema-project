const { createLogger, format, transports } = require("winston");
const path = require("path");

// Configure the Winston logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({
      filename: path.join(__dirname, "..", "logs", "app.log"),
    }), // Log to a file
  ],
});

module.exports = logger;
