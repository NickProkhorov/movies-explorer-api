const regexUrl = /^(https?:\/\/)?(w{3}\.)?[a-zA-Z0-9@:%._+~#=-]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const pageNotFoundErrMsg = 'Cтраница не существует';
const userNotFoundErrMsg = 'Пользователь c указанным id не найден';
const movieNotFoundErrMsg = 'Фильм c указанным id не найден';
const userStatusConflictErrMsg = 'Пользователь с такими данными уже существует';
const userBadRequestErrMsg = 'Переданы некорректные данные при создании пользователя';
const movieBadRequestErrMsg = 'Переданы некорректные данные при создании карточки';
const movieForbiddenErrMsg = 'Нельзя удалить чужой фильм';
const unauthErrMsg = 'Необходима авторизация';
const crashTestErrMsg = 'Сервер сейчас упадёт';
const unauthUserErrMsg = 'Неправильные почта или пароль';
const serverErrMsg = 'На сервере произошла ошибка';

module.exports = {
  regexUrl,
  pageNotFoundErrMsg,
  userNotFoundErrMsg,
  movieNotFoundErrMsg,
  userStatusConflictErrMsg,
  userBadRequestErrMsg,
  movieBadRequestErrMsg,
  movieForbiddenErrMsg,
  unauthErrMsg,
  crashTestErrMsg,
  unauthUserErrMsg,
  serverErrMsg,
};
