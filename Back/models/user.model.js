const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Session = new Schema({
  refreshToken: { type: String, default: "" },
});
const user = new Schema({
  username: { type: String, default: "" },
  authStrategy: { type: String, default: "local" },
  refreshToken: { type: [Session] },
});
//Remove refreshToken from the response
user.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});
user.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", user);
