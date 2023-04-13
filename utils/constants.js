const regexUrl = /^(https?:\/\/)?(w{3}\.)?[a-zA-Z0-9@:%._+~#=-]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const regexEnNames = /^[a-zA-Z0-9\s]+$/;
const regexRuNames = /[а-яА-ЯёЁ]/;

module.exports = { regexUrl, regexEnNames, regexRuNames };
