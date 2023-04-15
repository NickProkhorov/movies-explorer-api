require('dotenv').config();
const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;
const { userNotFoundErrMsg, userStatusConflictErrMsg, userBadRequestErrMsg } = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../config');
const NotFoundError = require('../errors/not-found-err');
const StatusConflictError = require('../errors/status-conflict-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(http2.constants.HTTP_STATUS_CREATED)
      .send({
        name: user.name, email: user.email,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new StatusConflictError(userStatusConflictErrMsg));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(userBadRequestErrMsg));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? JWT_SECRET_DEV : JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError(userNotFoundErrMsg); })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(userBadRequestErrMsg));
        return;
      }
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrMsg);
      }
      return res.send({
        name: user.name, email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(userBadRequestErrMsg));
        return;
      }
      next(err);
    });
};
