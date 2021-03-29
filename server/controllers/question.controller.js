const answers = require("../models/answer.model");
const questions = require("../models/question.model");

getAllQuestions = async (req, res) => {
  await questions
    .find({}, { __v: 0 }, (err, question) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!question.length) {
        return res.status(200).json({ success: true, data: question });
      }
      return res.status(200).json({ success: true, data: question });
    })
    .catch((err) => console.log(err));
};

getQuestion = async (req, res) => {
  var RANDOM_NUMBER = Math.random();
  console.log(RANDOM_NUMBER);
  await questions
    .aggregate(
      [
        { $match: { is_valid: { $eq: false }, ignore: { $eq: false } } },
        { $sample: { size: 1 } },
      ],
      (err, question) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!question) {
          console.log(question);
          return res.status(200).json({ success: true, data: question[0] });
        }
        console.log(question);
        return res.status(200).json({ success: true, data: question[0] });
      }
    )
    .catch((err) => console.log(err));
};

getValidQuestions = async (req, res) => {
  await questions
    .find(
      { is_valid: { $eq: true }, ignore: { $eq: false } },
      { __v: 0 },
      (err, question) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!question.length) {
          return res.status(200).json({ success: true, data: question });
        }
        return res.status(200).json({ success: true, data: question });
      }
    )
    .catch((err) => console.log(err));
};

getIgnoredQuestions = async (req, res) => {
  await questions
    .find(
      { is_valid: { $eq: false }, ignore: { $eq: true } },
      { __v: 0 },
      (err, question) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!question.length) {
          return res.status(200).json({ success: true, data: question });
        }
        return res.status(200).json({ success: true, data: question });
      }
    )
    .catch((err) => console.log(err));
};

addQuestion = async (req, res) => {
  const body = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "You must provide a question",
    });
  }
  var skipped = [];
  for (var doc in body) {
    if (!body[doc].question) {
      skipped.push(parseInt(doc) + 1);
      continue;
    }
    var question = new questions(body[doc]);
    question.save();
  }
  // console.log(body[1].question);
  return res.status(200).json({
    success: true,
    message: "skipped inputs at " + skipped,
  });
};

insertQuestion = async (req, res) => {
  const body = req.body;
  if (
    Object.keys(req.body).length === 0 ||
    !body.topic ||
    !body.answer_id ||
    !body.answer ||
    !body.question
  ) {
    return res.status(400).json({
      success: false,
      error: "You must provide the correct body to insert",
    });
  }

  answers.findOne({ _id: req.params.id }, (err, ans) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Check the provided id!",
      });
    }
    var qarr;
    ans.topic = body.topic;
    ans.answer_id = body.answer_id;
    ans.answer = body.answer;
    qarr = ans.questions;
    qarr.push(body.question);
    ans.questions = qarr;
    ans
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          result: ans.questions,
          message: "Question added!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Question not updated, you may check your parameters",
        });
      });
  });
};

validateQuestion = async (req, res) => {
  questions.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Question not validated!",
      });
    }
    question.is_valid = true;
    question
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          result: question,
          message: "Question validated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Question not validated!",
        });
      });
  });
};

ignoreQuestion = async (req, res) => {
  questions.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Question not ignored!",
      });
    }
    question.ignore = true;
    question
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          result: question,
          message: "Question ignored!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Question not ignored!",
        });
      });
  });
};

removeQuestion = async (req, res) => {
  await questions
    .findOneAndDelete({ _id: req.params.id }, (err, question) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!question) {
        return res
          .status(404)
          .json({ success: false, error: `Question not found` });
      }

      return res.status(200).json({
        success: true,
        message: "Question Deleted!",
      });
    })
    .catch((err) => console.log(err));
};

popQuestion = async (req, res) => {
  const body = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "You must provide a question to insert",
    });
  }

  await answers.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { questions: body.question } },
    { new: true, useFindAndModify: false },
    (err, answer) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "Answer id can't be found",
        });
      }
      return res.status(200).json({
        success: true,
        result: answer,
        message: "Question deleted!",
      });
    }
  );
};

module.exports = {
  getAllQuestions,
  getQuestion,
  getValidQuestions,
  getIgnoredQuestions,
  addQuestion,
  insertQuestion,
  validateQuestion,
  ignoreQuestion,
  removeQuestion,
  popQuestion,
};

// createQuestion = (req, res) => {
//   const body = req.body;

//   if (!body) {
//     return res.status(400).json({
//       success: false,
//       error: "You must provide a question",
//     });
//   }

//   const question = new questions(body);

//   if (!question) {
//     return res.status(400).json({ success: false, error: err });
//   }

//   question
//     .save()
//     .then(() => {
//       return res.status(201).json({
//         success: true,
//         id: question._id,
//         message: "Question created!",
//       });
//     })
//     .catch((error) => {
//       return res.status(400).json({
//         error,
//         message: "Question not created!",
//       });
//     });
// };

// getQuestionById = async (req, res) => {
//   await questions
//     .findOne({ _id: req.params.id }, (err, question) => {
//       if (err) {
//         return res.status(400).json({ success: false, error: err });
//       }

//       if (!question) {
//         return res
//           .status(404)
//           .json({ success: false, error: `Question not found` });
//       }
//       return res.status(200).json({ success: true, data: question });
//     })
//     .catch((err) => console.log(err));
// };

//   // First you need to find the document using the name field
//   var sub_system_1 = db.systems.findOne({ name: "sub_system_1" });
//   // set your new priority
//   sub_system_1.data.new_priority = ["task1", "task2"];
//   // Save updated document
//   db.systems.save(sub_system_1);
//   db.animal.update(
//     { "_id": "100" },
//     {
//         $push: {
//             animalArray: "cat"
//         }
//     }
// );

// insertQuestion = async (req, res) => {
//   const body = req.body;
//   if (Object.keys(req.body).length === 0) {
//     return res.status(400).json({
//       success: false,
//       error: "You must provide a question to insert",
//     });
//   }
//   await answers.updateOne(
//     { _id: req.params.id },
//     { $push: { questions: "body.question",}},
//     { new: true, useFindAndModify: false },
//     (err, answer) => {
//       if (err) {
//         return res.status(404).json({
//           err,
//           message: "Question can't be added, you may check the provided id",
//         });
//       }
//       return res.status(200).json({
//         success: true,
//         result: answer,
//         message: "Question added!",
//       });
//     }
//   );
// };
