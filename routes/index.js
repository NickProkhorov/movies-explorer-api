const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const NotFoundError = require('../errors/not-found-err');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');

// добавить JOI
router.post('/signup', createUser); // POST /signup - создаёт пользователя с переданными в теле email, password и name
router.post('/signin', login); // POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use(() => {
  throw new NotFoundError('страница не существует');
});

module.exports = router;