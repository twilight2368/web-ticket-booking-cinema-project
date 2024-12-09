const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi/api.json");
const path = require("path");
//TODO: Import mongo store to connect session
const MongoStore = require("connect-mongo");

//TODO: Import routes
const apiRoutes = require("./routes/api.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

//TODO: Import middlewares
const errorHandling = require("./middlewares/errorHandling");

//TODO: Import logger
const logger = require("./logging/tools/logger");

//TODO:Import config
const { dev_mode: DEV_MODE } = require("./configs/app.config");
const {
  stringConnect: MONGO_STRING_CONNECT,
} = require("./configs/database.config");
const {
  secretSession: SECRET_SESSION,
  sessionCookieTTL: SESSION_COOKIE_TTL,
} = require("./configs/auth.config");

//* Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization", "x-custom-header"], 
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

//* Logging middlewares

//TODO: Create Morgan middlewares that logs the console
app.use(morgan("dev"));
app.use(morgan("combined"));

//TODO: Create a Morgan stream that writes logs file with Winston
if (DEV_MODE) {
  const morganStream = {
    write: (message) => {
      logger.info(message.trim());
    },
  };
  app.use(morgan("combined", { stream: morganStream }));
}

//* Custom global middlewares

/**
 * * Custom PassportJS setup
 */

app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_STRING_CONNECT,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: SESSION_COOKIE_TTL,
    },
  })
);

require("./auth/passport/passport");
app.use(passport.initialize());
app.use(passport.session());

//* Set up  JSdoc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", express.static(path.join(__dirname, "..", "public")));

//* ---------- Routes ------------

// app.get("/", (req, res) => {
//   return res.json({
//     message: "Hello world",
//   });
// });

// app.get("/error", (req, res, next) => {
//   console.error("Error testing...");
//   throw new Error("Something went wrong!!!");
// });

app.use("/auth", authRoutes);

app.use("/api", apiRoutes);

app.use("/admin", adminRoutes);

app.use(errorHandling);

module.exports = app;
