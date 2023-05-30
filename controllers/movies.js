const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const { movieNotFoundErrMsg, movieForbiddenErrMsg, movieBadRequestErrMsg } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${movieBadRequestErrMsg}: ${err.message}`));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((checkMovie) => {
      if (!checkMovie) {
        throw new NotFoundError(movieNotFoundErrMsg);
      }
      const MovieOwnerId = checkMovie.owner._id.toString();
      const userId = req.user._id;
      if (MovieOwnerId === userId) {
        Movie.findByIdAndRemove(req.params._id)
          .then((movie) => res.send(movie))
          .catch(next);
      } else {
        throw new ForbiddenError(movieForbiddenErrMsg);
      }
    })
    .catch(next);
};
