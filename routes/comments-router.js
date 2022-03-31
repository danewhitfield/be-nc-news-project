const {
  deleteCommentById,
  patchCommentById,
} = require("../controllers/comments.controller");
const commentsRouter = require("express").Router();

// DELETE
commentsRouter.delete("/api/comments/:comment_id", deleteCommentById);

//PATCH
commentsRouter.patch("/api/comments/:comment_id", patchCommentById);

module.exports = commentsRouter;
