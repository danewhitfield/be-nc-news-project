exports.handleGenericErrors = (req, res, next) => {
  res.status(404).send({ msg: "not found!" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.handlePSQLErrors400 = (err, req, res, next) => {
  let badReqs = ["22P02"];
  if (badReqs.includes(err.code)) {
    res.status(400).send({ msg: "bad request!" });
  } else {
    next(err);
  }
};

exports.handlePSQLErrors404 = (err, req, res, next) => {
  let badReqs = ["23502", "23503", "42703"];
  if (badReqs.includes(err.code)) {
    res.status(404).send({ msg: "not found!" });
  } else {
    next(err);
  }
};

exports.handleDefaultErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
