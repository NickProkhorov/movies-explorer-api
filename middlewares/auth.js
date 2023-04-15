require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV, JWT_SECRET_DEV } = process.env;
const UnautorizedError = require('../errors/unauthorized-err');
const { unauthErrMsg } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError(unauthErrMsg);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET_DEV : JWT_SECRET);
  } catch (err) {
    throw new UnautorizedError(unauthErrMsg);
  }
  req.user = payload;
  return next();
};
