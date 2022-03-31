const {
  removeCommentById,
  updateCommentById,
} = require("../models/comments.model");

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

// PATCH
const patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { deleteCommentById, patchCommentById };
