const { getUsers } = require("../controllers/users.controller");
const usersRouter = require("express").Router();

usersRouter.get("/api/users", getUsers);

module.exports = usersRouter;
