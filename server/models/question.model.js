const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema({
  question: String,
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() },
  isProcessing: { type: Boolean, default: false },
  is_valid: { type: Boolean, default: false },
  ignore: { type: Boolean, default: false },
  username: String,
});

module.exports = mongoose.model("question", question);
