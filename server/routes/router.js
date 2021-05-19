const express = require("express");

const answerCtrl = require("../controllers/answer.controller");

const questionCtrl = require("../controllers/question.controller");

const topicCtrl = require("../controllers/topic.controller");

const router = express.Router();

// router.post("/topic/", topicCtrl.addTopic);   //prod **
router.get("/topic", topicCtrl.getOnlyTopics);   //prod
router.put("/topic/:topic", topicCtrl.modifyTopic);   //prod **
router.delete("/topic/:topic", topicCtrl.deleteTopic);   //prod *

router.post("/question/multi", questionCtrl.addQuestions);   //prod *
router.post("/question/", questionCtrl.createQuestion);
router.get("/question/all", questionCtrl.getAllQuestions);
router.get("/question", questionCtrl.getQuestion);   //prod
router.get("/question/count", questionCtrl.getQuestionCount);   //prod
router.get("/question/:id", questionCtrl.getQuestionById);
router.get("/question/valid", questionCtrl.getValidQuestions);
router.get("/question/ignored", questionCtrl.getIgnoredQuestions);
router.put("/question/:id", questionCtrl.modifyQuestion);   //prod *
router.put("/question/ignore/:id", questionCtrl.ignoreQuestion);   //prod
router.put("/question/validate/:id", questionCtrl.validateQuestion);   //prod
router.delete("/question/:id", questionCtrl.removeQuestion);

// router.post("/answer", answerCtrl.addTopic);   //prod **
router.post("/answer", answerCtrl.addAnswer);
router.get("/answer/all", answerCtrl.getAll);
router.get("/answer/topic/:topic", answerCtrl.getAnswersbyTopic);   //prod
router.get("/answer/:id", answerCtrl.getAnswerById);
router.put("/answer/:id", answerCtrl.modifyAnswer);   //prod *
router.delete("/answer/:id", answerCtrl.deleteAnswer);   //prod *
router.put("/answer/question/:id", answerCtrl.insertQuestion);   //prod
router.delete("/answer/question/:id", answerCtrl.popQuestion);

module.exports = router;
