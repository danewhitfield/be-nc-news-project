const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.findArticleById = async (article_id) => {
  const result = await db.query(
    `SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count FROM articles
     LEFT JOIN comments 
     ON comments.article_id = articles.article_id 
     WHERE articles.article_id = $1
     GROUP BY articles.article_id;`,
    [article_id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }
  return result.rows[0];
};

exports.changeVotesByArticleId = async (article_id, inc_votes) => {
  const result = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
    [inc_votes, article_id]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }
  return result.rows[0];
};

exports.findArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {
  order = order.toUpperCase();
  sort_by = sort_by.toLowerCase();

  // VALIDATION
  const validSortBy = [
    "created_at",
    "article_id",
    "votes",
    "title",
    "body",
    "author",
    "topic",
  ];
  const validOrder = ["ASC", "DESC"];

  if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "bad request!" });
  }

  // QUERY
  let queryStr = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT(comments.comment_id)::INT AS comment_count FROM articles
  JOIN comments 
  ON comments.article_id = articles.article_id
  `;
  const queryVals = [];

  if (topic !== undefined) {
    queryStr += `WHERE topic = $1`;
    topic = topic.toLowerCase();
    queryVals.push(topic);
  }

  queryStr += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  const result = await db.query(queryStr, queryVals);
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }
  return result.rows;
};

exports.findComments = async (article_id) => {
  const result = await db.query(
    `SELECT * FROM comments WHERE article_id = $1`,
    [article_id]
  );
  return result.rows;
};

exports.createComment = async (article_id, username, body) => {
  const result = await db.query(
    `
  INSERT INTO comments
  (article_id, author, body)
  VALUES
  ($1, $2, $3)
  RETURNING *`,
    [article_id, username, body]
  );
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found!" });
  }
  return result.rows[0];
};
