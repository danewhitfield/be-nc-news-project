const {
  getUsers,
  getUserByUsername,
  createNewUser,
} = require("../controllers/users.controller");
const usersRouter = require("express").Router();

// GET
usersRouter.get("/api/users", getUsers);
usersRouter.get("/api/users/:username", getUserByUsername);

// POST
usersRouter.post("/api/users", createNewUser);

module.exports = usersRouter;
