const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const AuthoriseFirstError = require('../errors/AuthoriseFirstError');
const { errorTexts } = require('../constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new AuthoriseFirstError(errorTexts.needToAuthoriseError);
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jsonwebtoken.verify(token, JWT_SECRET);
    } catch (error) {
      throw new AuthoriseFirstError(errorTexts.needToAuthoriseError);
    }
    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
  /*
  const { authorization } = req.headers;
  let err;
  if (!authorization || !authorization.startsWith('Bearer')) {
    err = new AuthoriseFirstError(errorTexts.needToAuthoriseError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(token, JWT_SECRET);
  } catch (error) {
    err = new AuthoriseFirstError(errorTexts.needToAuthoriseError);
  }

  req.user = payload;

  next(err);
  */
};
