const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/chatbot-entries", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
