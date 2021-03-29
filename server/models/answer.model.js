const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answer = new Schema({
  A_id: Number,
  topic: String,
  answer: String,
  questions: [String],
});

module.exports = mongoose.model("answer", answer);
