const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var subquestion = mongoose.Schema(
  {
    question: String,
  },
  { _id: false }
);

const answer = new Schema({
  A_id: Number,
  topic: String,
  answer: String,
  questions: [subquestion],
});

module.exports = mongoose.model("answer", answer);
