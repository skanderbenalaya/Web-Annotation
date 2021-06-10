const answers = require("../models/answer.model");

getOnlyTopics = async (req, res) => {
  await answers
    .distinct("topic", (err, topic) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!topic.length) {
        // console.log("Number of answers", topic.length);
        return res.status(200).json({ success: true, data: topic });
      }
      // console.log("Number of topics", topic.length);
      return res.status(200).json({ success: true, data: topic });
    })
    .catch((err) => console.log(err));
};

modifyTopic = async (req, res) => {
  const body = req.body;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "You must provide a topic in order to modify it",
    });
  }

  await answers.updateMany(
    { topic: req.params.topic },
    { $set: { topic: body.topic } },
    (err, topic) => {
      if (err) {
        return res.status(404).json({
          err,
          message: "Topic can't be found",
        });
      }
      return res.status(200).json({
        success: true,
        result: topic,
        update: body.topic,
        message: "Topic updated!",
      });
    }
  );
};

deleteTopic = async (req, res) => {
  await answers
    .remove({ topic: req.params.topic }, (err, topic) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!topic) {
        return res
          .status(404)
          .json({ success: false, error: `Topic not found` });
      }

      return res.status(200).json({
        success: true,
        message: "Topic Deleted!",
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getOnlyTopics,
  modifyTopic,
  deleteTopic,
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
