const {
  findArticleById,
  changeVotesByArticleId,
  createComment,
  findArticles,
  findComments,
  addNewArticle,
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
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  findArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [findComments(article_id)];
  if (article_id) promises.push(findArticleById(article_id));

  Promise.all(promises)
    .then((result) => {
      const comments = result[0];
      res.status(200).send({ comments });
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

// ADD NEW ARTICLE
// exports.createArticle = (req, res, next) => {
//   console.log("req:", req.body);
//   const { title, author, topic, body } = req.body;
//   addNewArticle(title, author, topic, body).then((newArticle) => {
//     console.log("newArticle:", newArticle);
//     res.status(201).send(newArticle);
//   });
// };
