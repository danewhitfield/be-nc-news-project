const {
  getUsers,
  getUserByUsername,
} = require("../controllers/users.controller");
const usersRouter = require("express").Router();

usersRouter.get("/api/users", getUsers);
usersRouter.get("/api/users/:username", getUserByUsername);

module.exports = usersRouter;
