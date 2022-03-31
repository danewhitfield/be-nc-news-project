const express = require("express");
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");
const apiRouter = require("./routes/api-router");
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");

const app = express();
app.use(express.json());

// APP.USE ROUTERS
app.use(articlesRouter);
app.use(commentsRouter);
app.use(apiRouter);
app.use(topicsRouter);
app.use(usersRouter);

// ERRORS
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
  let badReqs = ["23502", "23503", "42703"];
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
  console.log(err);
  next(err);
});

// DEFAULT
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
