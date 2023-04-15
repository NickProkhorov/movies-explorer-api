const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { movieNotFoundErrMsg, movieForbiddenErrMsg } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: 'owner' })
    // .populate(['owner'])
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
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((checkMovie) => {
      if (!checkMovie) {
        throw new NotFoundError(movieNotFoundErrMsg);
      }
      const MovieOwnerId = checkMovie.owner._id.toString();
      const userId = req.user._id;
      if (MovieOwnerId === userId) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movie) => res.send(movie))
          .catch(next);
      } else {
        throw new ForbiddenError(movieForbiddenErrMsg);
      }
    })
    .catch(next);
};
