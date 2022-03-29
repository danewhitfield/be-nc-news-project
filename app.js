const express = require("express");
const {
  getArticleById,
  updateVotesByArticleId,
  postComment,
  getArticles,
  getComments,
} = require("./controllers/articles.controller");
const { getTopics } = require("./controllers/topics.controller");
const { getUsers } = require("./controllers/users.controller");
const app = express();

app.use(express.json());

// GET
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getComments);

// PATCH
app.patch("/api/articles/:article_id", updateVotesByArticleId);

// POST
app.post("/api/articles/:article_id/comments", postComment);

// GENERIC HANDLER
app.use((req, res, next) => {
  res.status(404).send({ msg: "not found!" });
});

// PG ERROR HANDLERS
app.use((err, req, res, next) => {
  let badReqs = ["22P02"];
  if (badReqs.includes(err.code)) {
    res.status(400).send({ msg: "bad request!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  let badReqs = ["23502", "23503"];
  if (badReqs.includes(err.code)) {
    res.status(404).send({ msg: "not found!" });
  } else {
    next(err);
  }
});

// CUSTOM HANDLER
app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  // console.log(err);
  next(err);
});

// app.use((err, req, res, next) => {
//   res.status(400).send({ msg: "bad request!" });
//   next(err);
// });

// DEFAULT
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
