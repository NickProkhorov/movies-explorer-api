const router = require('express').Router();
const auth = require('../middlewares/auth');

const { checkCreateMovie, checkDeleteMovie } = require('../middlewares/validator');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', auth, getMovies);
router.post('/', auth, checkCreateMovie, createMovie);
router.delete('/:_id', auth, checkDeleteMovie, deleteMovie);

module.exports = router;
