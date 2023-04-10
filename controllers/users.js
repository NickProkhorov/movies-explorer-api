const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const StatusConflictError = require('../errors/status-conflict-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.createUser = (req, res, next) => { // POST /signup - создаёт пользователя с переданными в теле email, password и name
  const {
    name, about, avatar, email, password,
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
        next(new StatusConflictError('Пользователь с такими данными уже существует'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => { // POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV !== 'production' ? 'extra-secret-key' : process.env.JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => { // GET /users/me - возвращает информацию о пользователе (email и имя)
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь c указанным id не найден'); })
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => { // PATCH /users/me - обновляет информацию о пользователе (email и имя)
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден');
      }
      return res.send({
          name: user.name, email: user.email, _id: user._id,
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};