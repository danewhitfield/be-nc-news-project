const { getAPI } = require("../controllers/api.controller");
const apiRouter = require("express").Router();

apiRouter.get("/api", getAPI);

module.exports = apiRouter;
