const db = require("../db/connection");

exports.findUsers = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found!" });
    }
    return result.rows;
  });
};
