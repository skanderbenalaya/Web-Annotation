const express = require("express");
const passport = require("passport");
const users = require("../models/user.model");
const jwt = require("jsonwebtoken");

const answerCtrl = require("../controllers/answer.controller");
const questionCtrl = require("../controllers/question.controller");
const topicCtrl = require("../controllers/topic.controller");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
} = require("../authenticate");

const router = express.Router();

router.post("/auth/register", (req, res, next) => {
  // Verify that first name is not empty
  if (!req.body.username) {
    res.statusCode = 500;
    res.send({
      name: "usernameError",
      message: "The username is required",
    });
  } else {
    users.register(
      new users({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          user.username = req.body.username;
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});

router.post("/auth/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  users.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/auth/refreshtoken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      users.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              console.log("Unauthorized1");
              res.statusCode = 401;
              res.send("Unauthorized1");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            console.log("Unauthorized2");
            res.statusCode = 401;
            res.send("Unauthorized2");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      console.log("Unauthorized3");
      res.statusCode = 401;
      res.send("Unauthorized3");
    }
  } else {
    console.log("Unauthorized4");
    res.statusCode = 401;
    res.send("Unauthorized4");
  }
});

router.get("/auth/user", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/auth/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  users.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});

// router.get("/auth/user", verifyUser, userCtrl.getUser);
// router.get("/auth/logout", verifyUser, userCtrl.logOut);
// router.post("/auth/register", userCtrl.signupUser);
// router.post(
//   "/auth/login",
//   passport.authenticate("local"),
//   userCtrl.signinUser
// );
// router.post("/auth/refreshtoken", userCtrl.refreshToken);

router.get("/topic", topicCtrl.getOnlyTopics);
router.put("/topic/:topic", topicCtrl.modifyTopic);
router.delete("/topic/:topic", topicCtrl.deleteTopic);

router.post("/question/multi", questionCtrl.addQuestions);
router.post("/question/", questionCtrl.createQuestion);
router.get("/question/all", questionCtrl.getAllQuestions);
router.get("/question/exclude/:id", questionCtrl.getQuestion);
router.get("/question/count", questionCtrl.getQuestionCount);
router.get("/question/:id", questionCtrl.getQuestionById);
router.get("/question/valid", questionCtrl.getValidQuestions);
router.get("/question/ignored", questionCtrl.getIgnoredQuestions);
router.put("/question/:id", questionCtrl.modifyQuestion);
router.put("/question/ignore/:id", questionCtrl.ignoreQuestion);
router.put("/question/validate/:id", questionCtrl.validateQuestion);
router.put("/question/release/:id", questionCtrl.releaseQuestion);
  // console.log(
  //   `BEACON TO RELEASE RECEIVED AT ${new Date().toISOString()}`
  // );
router.delete("/question/:id", questionCtrl.removeQuestion);

router.post("/answer", answerCtrl.addAnswer);
router.get("/answer/all", answerCtrl.getAll);
router.get("/answer/topic/:topic", answerCtrl.getAnswersbyTopic);
router.get("/answer/:id", answerCtrl.getAnswerById);
router.put("/answer/:id", answerCtrl.modifyAnswer);
router.delete("/answer/:id", answerCtrl.deleteAnswer);
router.put("/answer/question/:id", answerCtrl.insertQuestion);
router.delete("/answer/question/:id", answerCtrl.popQuestion);

module.exports = router;
