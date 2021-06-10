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

const app = express();

require("dotenv").config();

const apiPort = process.env.PORT;
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", Router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
app.get("/", (req, res) => {
  res.send({ status: "success" });
});
app.get("/favicon.ico", (req, res) => res.status(204));
