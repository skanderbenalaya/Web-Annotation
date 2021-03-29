const express = require("express");
const cors = require("cors");
const db = require("./config/mongodb.config");
const Router = require("./routes/router");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
const app = express();
const apiPort = 3000;

app.use(cors());
app.use(express.json());

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}
app.use(ignoreFavicon);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", Router);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
app.get("/", (req, res) => {
  res.send("Yo!");
});
