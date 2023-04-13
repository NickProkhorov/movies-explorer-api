const router = require('express').Router();
const auth = require('../middlewares/auth');

const { checkUpdateUserProfile } = require('../middlewares/validator');

const {
  updateUserProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', auth, getCurrentUser); // GET /users/me - возвращает информацию о пользователе (email и имя)

router.patch('/me', auth, checkUpdateUserProfile, updateUserProfile);

module.exports = router;
