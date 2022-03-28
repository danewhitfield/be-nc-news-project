const express = require("express");
const { getArticleById } = require("./controllers/articles.controller");
const { getTopics } = require("./controllers/topics.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

// GENERIC
app.use((req, res, next) => {
  res.status(404).send({ msg: "not found!" });
});

// DEFAULT
app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
