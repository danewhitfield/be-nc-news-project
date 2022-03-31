const {
  findArticleById,
  changeVotesByArticleId,
  createComment,
  findArticles,
  findComments,
} = require("../models/articles.model");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  findArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch(next);
};

const updateVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  changeVotesByArticleId(article_id, inc_votes)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  findArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

const getComments = (req, res, next) => {
  const { article_id } = req.params;
  findComments(article_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};

const postComment = (req, res, next) => {
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

module.exports = {
  getArticleById,
  updateVotesByArticleId,
  getArticles,
  getComments,
  postComment,
};
