//require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { urlPattern, errorTexts } = require('./constants');
const NotFoundError = require('./errors/NotFoundError');

//const { PORT = 3001 } = process.env;

const app = express();

const corsOptions = {
  origin: [
    'https://mesto.vrazdorsky.nomoredomains.monster',
    'http://localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
};

app.use(helmet());
app.use('*', cors(corsOptions));

app.use(bodyParser.json());

app.use(requestLogger);

// роуты, не требующие авторизации
app.post('/signin', cors({ origin: '<https://mesto.vrazdorsky.nomoredomains.monster>', credentials: true }), celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
/*
app.post('/signin', cors(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
*/
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// Авторизация
app.use(auth);

// роуты, требующие авторизацию
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  const err = new NotFoundError(errorTexts.incorrectRouteError);
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(3001);
});
