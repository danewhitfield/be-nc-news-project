const { getTopics } = require("../controllers/topics.controller");
const topicsRouter = require("express").Router();

topicsRouter.get("/api/topics", getTopics);
module.exports = topicsRouter;
