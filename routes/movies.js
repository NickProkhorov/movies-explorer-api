const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../midllewares/auth');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', auth, getMovies); // GET /movies - возвращает все сохранённые текущим  пользователем фильмы
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }),
}), createMovie); // POST /movies - создаёт фильм с переданными в теле: country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

router.delete('/_id', auth, celebrate({ // DELETE /movies/_id - удаляет сохранённый фильм по id
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;





