const {
  findArticleById,
  changeVotesByArticleId,
  findArticles,
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
