const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.findArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count FROM articles
     LEFT JOIN comments 
     ON comments.article_id = articles.article_id 
     WHERE articles.article_id = $1
     GROUP BY articles.article_id;`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }
      return result.rows[0];
    });
};

exports.changeVotesByArticleId = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }

      return result.rows[0];
    });
};

exports.findArticles = (sort_by = "created_at", order = "DESC", topic) => {
  const validSortBy = ["created_at", "article_id", "votes", "title"];
  const validOrder = ["asc", "desc", "ASC", "DESC"];
  const validTopics = ["mitch", "cats", "paper"];

  if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  }

  if (topic && !validTopics.includes(topic)) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }

  let queryStr = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT(comments.comment_id)::INT AS comment_count FROM articles
  JOIN comments 
  ON comments.article_id = articles.article_id
  `;
  const queryVals = [];

  if (topic) {
    queryStr += `WHERE topic = $1`;
    queryVals.unshift(topic);
  }

  queryStr += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  return db.query(queryStr, queryVals).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found!" });
    }
    return result.rows;
  });
};

exports.findComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }
      return result.rows;
    });
};

exports.createComment = (article_id, username, body) => {
  return db
    .query(
      `
  INSERT INTO comments
  (article_id, author, body)
  VALUES
  ($1, $2, $3)
  RETURNING *`,
      [article_id, username, body]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }
      return result.rows[0];
    });
};
