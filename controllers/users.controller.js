const { findUsers } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  findUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};
