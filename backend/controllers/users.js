const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const { errorTexts, httpAnswerCodes, JWT_SECRET } = require('../constants');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const IncorrectAuthorisationError = require('../errors/IncorrectAuthorisationError');
const IncorrectDataError = require('../errors/IncorrectDataError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(httpAnswerCodes.validOperationCode).json(users))
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorTexts.userNotFound);
      }

      return res.status(httpAnswerCodes.validOperationCode).json(user);
    })
    .catch((error) => {
      let err = error;
      if (error.name === 'CastError') {
        err = new IncorrectDataError(errorTexts.incorrectId);
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorTexts.userNotFound);
      }

      return res.status(httpAnswerCodes.validOperationCode).json(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(httpAnswerCodes.validCreationCode).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
    }))
    .catch((error) => {
      let err = error;
      if (error.name === 'ValidationError') {
        err = new ValidationError(errorTexts.incorrectData);
      } else if (error.code === 11000) {
        err = new Error(errorTexts.alreadyRegisteredError);
        err.statusCode = httpAnswerCodes.duplicateErrorCode;
      }
      next(err);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new IncorrectAuthorisationError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            throw new IncorrectAuthorisationError('Неправильные почта или пароль');
          }

          return user;
        });
    })
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res
        .status(httpAnswerCodes.validOperationCode)
        .send({ user, jwt });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorTexts.userNotFound);
      }

      return res.status(httpAnswerCodes.validOperationCode).json(user);
    })
    .catch((error) => {
      let err = error;
      if (error.name === 'ValidationError') {
        err = new ValidationError(errorTexts.incorrectData);
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorTexts.userNotFound);
      }

      return res.status(httpAnswerCodes.validOperationCode).json(user);
    })
    .catch((error) => {
      let err = error;
      if (error.name === 'ValidationError') {
        err = new ValidationError(errorTexts.incorrectData);
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
