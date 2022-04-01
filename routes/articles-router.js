const articlesController = require("../controllers/articles.controller");
const articlesRouter = require("express").Router();

// GET
articlesRouter.get(
  "/api/articles/:article_id",
  articlesController.getArticleById
);
articlesRouter.get("/api/articles", articlesController.getArticles);
articlesRouter.get(
  "/api/articles/:article_id/comments",
  articlesController.getComments
);

// PATCH
articlesRouter.patch(
  "/api/articles/:article_id",
  articlesController.updateVotesByArticleId
);

// POST
articlesRouter.post(
  "/api/articles/:article_id/comments",
  articlesController.postComment
);
// articlesRouter.post("/api/articles", articlesController.createArticle);

module.exports = articlesRouter;
