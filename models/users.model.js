const res = require("express/lib/response");
const db = require("../db/connection");

exports.findUsers = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found!" });
    }
    return result.rows;
  });
};

exports.findUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }
      return result.rows[0];
    });
};

exports.addNewUser = (username, name, avatar_url) => {
  if (!username || !name) {
    return Promise.reject({
      status: 400,
      msg: "username and name fields are required!",
    });
  } else if (typeof username !== "string" || typeof name !== "string") {
    return Promise.reject({ status: 400, msg: "invalid username or name!" });
  }

  return db
    .query(
      `
  INSERT INTO users 
  (username, name, avatar_url)
  VALUES
  ($1, $2, $3)
  RETURNING *;`,
      [username, name, avatar_url]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found!" });
      }
      return result.rows[0];
    });
};
