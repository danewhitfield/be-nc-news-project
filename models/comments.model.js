const db = require("../db/connection");

// DELETE
exports.removeCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }
      console.log("result:", result.rows);
      return result.rows[0];
    });
};
