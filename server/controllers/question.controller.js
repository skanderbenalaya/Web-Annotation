const mongoose = require("mongoose");
const questions = require("../models/question.model");

getAllQuestions = async (req, res) => {
  await questions
    .find({}, { __v: 0 }, (err, question) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!question.length) {
        console.log("Number of questions", question.length);
        return res.status(200).json({ success: true, data: question });
      }
      console.log("Number of questions", question.length);
      return res.status(200).json({ success: true, data: question });
    })
    .catch((err) => console.log(err));
};

getQuestion = async (req, res) => {
  var id;
  req.params.id == 0 ? (id = "000000000000000000000000") : (id = req.params.id);
  await questions
    .aggregate(
      [
        {
          $match: {
            $and: [
              { _id: { $ne: mongoose.Types.ObjectId(id) } },
              { isProcessing: { $eq: false } },
              { is_valid: { $eq: false } },
              { ignore: { $eq: false } },
            ],
          },
        },
        { $sample: { size: 1 } },
      ],
      (err, question) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        console.log("exception ", req.params.id);
        if (!question.length) {
          console.log("Q : ", question);
          return res.status(200).json({ success: true, data: {} });
        }
        questions.findOne({ _id: question[0]._id }, (er, ques) => {
          if (er) {
            return res.status(404).json({
              er,
              message: "Question not found!",
            });
          }
          ques.isProcessing = true;
          ques
            .save()
            .then(() => {
              console.log("Q : ", ques);
              return res.status(200).json({
                success: true,
                data: ques,
                message: "Question fetched!",
              });
            })
            .catch((error) => {
              return res.status(404).json({
                error,
                message: "Question not fetched!",
              });
            });
        });
      }
    )
    .catch((err) => console.log(err));
};

releaseQuestion = async (req, res) => {
  questions.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      if (req.params.id === 0) {
        return res.status(200).json({
          success: true,
        });
      } else {
        return res.status(404).json({
          err,
          message: "Question not found!",
        });
      }
    }
    console.log("Releasing: ", req.params.id);
    question.isProcessing = false;
    question
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          result: question,
          message: "Question updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Question not updated!",
        });
      });
  });
};

// getQuestion = async (req, res) => {
//   await questions
//     .aggregate(
//       [
//         { $match: { is_valid: { $eq: false }, ignore: { $eq: false } } },
//         { $sample: { size: 1 } },
//         { $set: { isProcessing: true } },
//       ],
//       (err, question) => {
//         if (err) {
//           return res.status(400).json({ success: false, error: err });
//         }
//         console.log("Q: ", question);
//         if (!question.length) {
//           return res.status(200).json({ success: true, data: {} });
//         }
//         console.log("question: ", question);
//         return res.status(200).json({ success: true, data: question[0] });
//       }
//     )
//     .catch((err) => console.log(err));
// };

getQuestionCount = async (req, res) => {
  await questions
    .find(
      {
        is_valid: { $eq: false },
        ignore: { $eq: false },
      },
      { __v: 0 },
      (err, question) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!question.length) {
          console.log("COUNT ", question.length);
          return res.status(200).json({ success: true, data: question.length });
        }
        console.log("COUNT ", question.length);
        return res.status(200).json({ success: true, data: question.length });
      }
    )
    .catch((err) => console.log(err));
};

getQuestionById = async (req, res) => {
  await questions
    .findOne({ _id: req.params.id }, (err, question) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      console.log("id ", req.params.id);
      if (!question) {
        return res
          .status(404)
          .json({ success: false, error: `Question not found` });
      }
      return res.status(200).json({ success: true, data: question });
    })
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
          console.log("Number of questions", question.length);
          return res.status(200).json({ success: true, data: question });
        }
        console.log("Number of questions", question.length);
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
          console.log("Number of questions", question.length);
          return res.status(200).json({ success: true, data: question });
        }
        console.log("Number of questions", question.length);
        return res.status(200).json({ success: true, data: question });
      }
    )
    .catch((err) => console.log(err));
};

createQuestion = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a question",
    });
  }

  const question = new questions(body);

  if (!question) {
    return res.status(400).json({ success: false, error: err });
  }
  console.log(question);
  question.isProcessing = true;
  question.username = "";
  question
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        data: question,
        message: "Question created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Question not created!",
      });
    });
};

addQuestions = async (req, res) => {
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
    question.username = "";
    question.save();
  }
  // console.log(body[1].question);
  return res.status(200).json({
    success: true,
    message: "skipped inputs at " + skipped,
  });
};

modifyQuestion = async (req, res) => {
  const body = req.body;
  if (!body.question) {
    return res.status(400).json({
      success: false,
      error: "You must provide a question to update",
    });
  }

  questions.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Question not found!",
      });
    }
    question.question = body.question;
    question.modifiedAt = new Date();
    question
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          result: question,
          message: "Question updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Question not updated!",
        });
      });
  });
};

validateQuestion = async (req, res) => {
  const body = req.body;
  console.log("submit body ", body);
  questions.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Question not validated!",
      });
    }
    question.is_valid = true;
    question.modifiedAt = new Date();
    question.username = body.username;
    question
      .save()
      .then(() => {
        console.log("submit ", question);
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
  const body = req.body;
  console.log("submit body ", body);
  questions.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Question not ignored!",
      });
    }
    question.ignore = true;
    question.modifiedAt = new Date();
    question.username = body.username;
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

      return res.status(200).json({
        success: true,
        message: "Question Deleted!",
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAllQuestions,
  getQuestion,
  getQuestionCount,
  getQuestionById,
  getValidQuestions,
  getIgnoredQuestions,
  createQuestion,
  addQuestions,
  modifyQuestion,
  validateQuestion,
  ignoreQuestion,
  removeQuestion,
  releaseQuestion,
};
