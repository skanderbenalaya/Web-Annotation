const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("../models/user.model");
//Called during login/sign up.
passport.use(new LocalStrategy(user.authenticate()));
//called while after logging in / signing up to set user details in req.user
passport.serializeUser(user.serializeUser());
