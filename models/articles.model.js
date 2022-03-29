const db = require("../db/connection");

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
