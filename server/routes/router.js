const express = require("express");

const answerCtrl = require("../controllers/answer.controller");

const questionCtrl = require("../controllers/question.controller");

const topicCtrl = require("../controllers/topic.controller");

const router = express.Router();

router.get("/topic", topicCtrl.getOnlyTopics);
router.put("/topic/:topic", topicCtrl.modifyTopic);
router.delete("/topic/:topic", topicCtrl.deleteTopic);

router.get("/question/all", questionCtrl.getAllQuestions);
router.get("/question", questionCtrl.getQuestion);
router.get("/question/valid", questionCtrl.getValidQuestions);
router.get("/question/ignored", questionCtrl.getIgnoredQuestions);
router.post("/question/", questionCtrl.addQuestion);
router.put("/question/validate/:id", questionCtrl.validateQuestion);
router.put("/question/ignore/:id", questionCtrl.ignoreQuestion);
router.delete("/question/:id", questionCtrl.removeQuestion);
router.delete("/answer/question/:id", questionCtrl.popQuestion);
router.put("/answer/question/:id", questionCtrl.insertQuestion);

router.get("/answer/all", answerCtrl.getAll);
router.get("/answer/topic/:topic", answerCtrl.getAnswersbyTopic);
router.get("/answer/:id", answerCtrl.getAnswerById);
router.put("/answer/:id", answerCtrl.modifyAnswer);
router.delete("/answer/:id", answerCtrl.deleteAnswer);

module.exports = router;
