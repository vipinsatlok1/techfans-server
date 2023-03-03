const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const model = require("../models/auth");

exports.authUser = async (req, res, next) => {
  try {
    // get token
    const token = req.cookies.auth;
    if (!token) return next(ErrorHandler.notAccept("not login"));

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!_id) return next(ErrorHandler.notAccept("token expired"));

    const user = await model.findById(_id);
    if (!user) return next(ErrorHandler.notAccept());

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.authRole = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return next(ErrorHandler.notAccept("only admin"));
    next();
  } catch (err) {
    next(err);
  }
};
