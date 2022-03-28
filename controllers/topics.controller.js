const { findTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  findTopics()
    .then((result) => {
      const topics = result.rows;
      res.status(200).send(topics);
    })
    .catch(next);
};
