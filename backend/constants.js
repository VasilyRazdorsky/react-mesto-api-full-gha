const errorTexts = {
  baseError: 'Произошла ошибка',
  userNotFound: 'Пользователь не найден',
  cardNotFound: 'Карточка не найдена',
  incorrectData: 'Введены некорректные данные',
  incorrectId: 'Некорректный id',
  alreadyRegisteredError: 'Пользователь с такими данными уже существует',
  cardAccessError: 'Взаимодействие с чужой карточкой невозможно',
  needToAuthoriseError: 'Необходима авторизация',
  incorrectRouteError: 'Некорректный путь',
};

const httpAnswerCodes = {
  baseErrorCode: 500,
  duplicateErrorCode: 409,
  objNotFoundCode: 404,
  incorrectDataCode: 400,
  validOperationCode: 200,
  validCreationCode: 201,
};

const JWT_SECRET = 'JWT_SECRET';

const urlPattern = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/i;

module.exports = {
  errorTexts,
  httpAnswerCodes,
  JWT_SECRET,
  urlPattern,
};
