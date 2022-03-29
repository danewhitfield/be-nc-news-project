const {
  findArticleById,
  changeVotesByArticleId,
  createComment,
  findArticles,
  findComments,
} = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  findArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

exports.updateVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  changeVotesByArticleId(article_id, inc_votes)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch((err) => {
      //   console.log("err:", err);
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  findArticles()
    .then((articles) => {
      res.status(200).send(articles);
})
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;
  findComments(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  createComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send(comment);
})
    .catch((err) => {
      next(err);
    });
};