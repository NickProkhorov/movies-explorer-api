const router = require('express').Router();
const {
  checkSignup, checkSignin,
} = require('../middlewares/validator');

const NotFoundError = require('../errors/not-found-err');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login } = require('../controllers/users');

router.post('/signup', checkSignup, createUser);

router.post('/signin', checkSignin, login);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use(() => {
  throw new NotFoundError('страница не существует');
});

module.exports = router;
