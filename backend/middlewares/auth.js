const jsonwebtoken = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const IncorrectAuthorisationError = require('../errors/IncorrectAuthorisationError');
const { errorTexts } = require('../constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new IncorrectAuthorisationError(errorTexts.needToAuthoriseError);
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
    } catch (error) {
      throw new IncorrectAuthorisationError(errorTexts.needToAuthoriseError);
    }
    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};
