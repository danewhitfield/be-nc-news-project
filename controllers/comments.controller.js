const { removeCommentById } = require("../models/comments.model");

// DELETE
const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then((comment) => {
      res.status(204).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = deleteCommentById;
