const express = require("express");
const { getArticleById } = require("./controllers/articles.controller");
const { getTopics } = require("./controllers/topics.controller");
const { updateVotesByArticleId } = require("./controllers/articles.controller");
const app = express();

app.use(express.json());

// GET
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

// PATCH
app.patch("/api/articles/:article_id", updateVotesByArticleId);

// GENERIC HANDLER
app.use((req, res, next) => {
  res.status(404).send({ msg: "not found!" });
});

// PG ERROR HANDLERS
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request!" });
  }
  next(err);
});

// CUSTOM HANDLER
app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

// app.use((err, req, res, next) => {
//   res.status(400).send({ msg: "bad request!" });
// });

// DEFAULT
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
