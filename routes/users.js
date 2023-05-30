const router = require('express').Router();
const auth = require('../middlewares/auth');

const { checkUpdateUserProfile } = require('../middlewares/validator');

const {
  updateUserProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, checkUpdateUserProfile, updateUserProfile); // PATCH /users/me обновляет информацию о пользователе (email и имя)

module.exports = router;
