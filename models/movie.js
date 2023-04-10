const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: { // director — режиссёр фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  duration: { // duration — длительность фильма. Обязательное поле-число.
    type: Number,
    required: true,
  },
  year: { // year — год выпуска фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },
  description: {  // description — описание фильма. Обязательное поле-строка.
    type: String,
    required: true,
  },

  image: { // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    validate: {
      validator(v) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },

  trailerLink: { // trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    validate: {
      validator(v) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },

  thumbnail: { // thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
    type: String,
    validate: {
      validator(v) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
  owner: { // owner — _id пользователя, который сохранил фильм. Обязательное поле.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: { // nameRU — название фильма на русском языке. Обязательное поле-строка. только кирилица
    type: String,
    required: true,
  },
  nameEN: {  // nameEN — название фильма на английском языке. Обязательное поле-строка. только латиница
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
