const deleteCommentById = require("../controllers/comments.controller");
const commentsRouter = require("express").Router();

// DELETE
commentsRouter.delete("/api/comments/:comment_id", deleteCommentById);

module.exports = commentsRouter;
