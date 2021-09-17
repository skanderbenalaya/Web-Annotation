const mongoose = require("mongoose");
const url = process.env.MONGO_DB_CONNECTION_STRING;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB.");
    process.exit();
  });

const db = mongoose.connection;

module.exports = db;
