// ROUTERS
const express = require("express");
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");
const apiRouter = require("./routes/api-router");
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const cors = require("cors");

// ERROR HANDLING
const {
  handleGenericErrors,
  handleCustomErrors,
  handlePSQLErrors400,
  handlePSQLErrors404,
  handleDefaultErrors,
} = require("./errors/errors");

const app = express();
app.use(express.json());

// CORS
app.use(cors());

// APP.USE ROUTERS
app.use(articlesRouter);
app.use(commentsRouter);
app.use(apiRouter);
app.use(topicsRouter);
app.use(usersRouter);

// APP.USE ERRORS
app.use(handleGenericErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors400);
app.use(handlePSQLErrors404);
app.use(handleDefaultErrors);

module.exports = app;
