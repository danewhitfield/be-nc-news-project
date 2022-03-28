const db = require("../db/connection");

exports.findArticleById = (article_id) => {
  //   if (article_id > ) {
  //     return Promise.reject({ status: 404, msg: "not found!" });
  //   }

  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      return result.rows[0];
    });
};

exports.changeVotesByArticleId = (article_id, inc_votes) => {
  if (typeof article_id !== "number") {
  }
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
