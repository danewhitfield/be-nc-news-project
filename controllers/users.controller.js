const {
  findUsers,
  findUserByUsername,
  addNewUser,
} = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  findUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  findUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.createNewUser = (req, res, next) => {
  const { username, name, avatar_url } = req.body;
  addNewUser(username, name, avatar_url)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
