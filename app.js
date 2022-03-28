const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { updateVotesByArticleId } = require("./controllers/articles.controller");
const app = express();

app.use(express.json());

// GET
app.get("/api/topics", getTopics);

// PATCH
app.patch("/api/articles/:article_id", updateVotesByArticleId);

// GENERIC HANDLER
app.use((req, res, next) => {
  res.status(404).send({ msg: "not found!" });
});

// CUSTOM HANDLER
app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
});

// DEFAULT
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
