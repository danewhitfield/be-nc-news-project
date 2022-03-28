const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.findArticleById = (article_id) => {
  console.log("article_id:", article_id);
  if (article_id > articles.length) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }

  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      return result.rows[0];
    });
};
