const {
  getUsers,
  getUserByUsername,
  createNewUser,
  deleteUserByUsername,
} = require("../controllers/users.controller");
const usersRouter = require("express").Router();

// GET
usersRouter.get("/api/users", getUsers);
usersRouter.get("/api/users/:username", getUserByUsername);

// POST
usersRouter.post("/api/users", createNewUser);

// DELETE
usersRouter.delete("/api/users/:username", deleteUserByUsername);

module.exports = usersRouter;
