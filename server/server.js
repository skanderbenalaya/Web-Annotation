const fs = require("fs");
const https = require("https");
const express = require("express");
const passport = require("passport");
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/mongodb.config");
const Router = require("./routes/router");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const httpsOptions = {
  key: fs.readFileSync("./config/server.key"),
  cert: fs.readFileSync("./config/server.cert"),
};
const mongoose = require("mongoose");
const questions = require("./models/question.model");

var beaconCounter = 0;
const app = express();
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.hostname}:3000${req.originalUrl}`
  );
  next();
});
require("dotenv").config();

const apiPort = process.env.PORT;
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];
console.log(whitelist);
const corsOptions = {
  origin: function (origin, callback) {
    // console.log(whitelist.indexOf(origin));
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(passport.initialize());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", Router);

app.get("/", (req, res) => {
  res.send({ status: "success" });
});
const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(apiPort, () =>
  console.log(`Server running on port ${apiPort}`)
);
