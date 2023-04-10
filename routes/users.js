
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../midllewares/auth');

const {
  updateUserProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', auth, getCurrentUser); // GET /users/me - возвращает информацию о пользователе (email и имя)

router.patch('/me', auth, celebrate({ // PATCH /users/me - обновляет информацию о пользователе (email и имя)
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

module.exports = router;
