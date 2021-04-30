const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema({
  question: String,
  is_valid: { type: Boolean, default: 0 },
  ignore: { type: Boolean, default: 0 },
  rnd: Number,
});

module.exports = mongoose.model("question", question);
