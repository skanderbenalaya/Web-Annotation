const answers = require("../models/answer.model");

getAll = async (req, res) => {
  await answers
    .find({}, { __v: 0 }, (err, answer) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!answer.length) {
        return res.status(200).json({ success: true, data: answer });
      }
      return res.status(200).json({ success: true, data: answer });
    })
    .catch((err) => console.log(err));
};

getAnswersbyTopic = async (req, res) => {
  await answers
    .find(
      { topic: req.params.topic },
      { A_id: 1, answer: 1 },
      (err, answer) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!answer.length) {
          return res
            .status(404)
            .json({ success: false, error: `No answers found` });
        }
        console.log("Number of answers", answer.length);
        return res.status(200).json({ success: true, data: answer });
      }
    )
    .catch((err) => console.log(err));
};

getAnswerById = async (req, res) => {
  await answers
    .findOne({ _id: req.params.id }, (err, answer) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!answer) {
        return res
          .status(404)
          .json({ success: false, error: `Answer not found` });
      }
      return res.status(200).json({ success: true, data: answer });
    })
    .catch((err) => console.log(err));
};

modifyAnswer = async (req, res) => {
  const body = req.body;
  if (!body.answer) {
    return res.status(400).json({
      success: false,
      error: "You must provide an answer to update",
    });
  }

  answers.findOne({ _id: req.params.id }, (err, ans) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Answer not found!",
      });
    }
    ans.answer = body.answer;
    ans
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          result: ans,
          message: "Answer updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Answer not updated!",
        });
      });
  });
};

deleteAnswer = async (req, res) => {
  await answers
    .findOneAndDelete({ _id: req.params.id }, (err, answer) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!answer) {
        return res
          .status(404)
          .json({ success: false, error: `Answer not found` });
      }

      return res.status(200).json({
        success: true,
        message: "Answer Deleted!",
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAll,
  getAnswersbyTopic,
  getAnswerById,
  modifyAnswer,
  deleteAnswer,
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
