const error = (err, req, res, next) => {
  let message = err.message || "server error, please try again";
  let status = err.status || 500;

  res.status(status).send(message);
};

module.exports = error;
