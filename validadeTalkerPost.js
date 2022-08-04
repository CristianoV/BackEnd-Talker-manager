// const validateDate = require('validate-date');

const HTTP_BAD_REQUEST_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS2 = 400;

const validadeToken = (_request, response, next) => {
  const { authorization } = _request.headers;
  if (authorization === undefined || typeof authorization !== 'string') {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length < 16) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'Token inválido',
    });
  }
  next();
};

const validadeName = (_request, response, next) => {
  const { name } = _request.body;
  if (name === undefined || typeof name !== 'string') {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validadeAge = (_request, response, next) => {
  const { age } = _request.body;
  if (age === undefined || typeof age !== 'number') {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age <= 18) {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const validadeTalk = (_request, response, next) => {
  const { talk } = _request.body;
  if (talk === undefined || typeof talk !== 'object') {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};

const validadeRate = (_request, response, next) => {
  const { rate } = _request.body.talk;
  if (rate === undefined || typeof rate !== 'number') {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (rate < 0 || rate > 5) {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const validadeDate = (_request, response, next) => {
  const { watchedAt } = _request.body.talk;
  if (watchedAt === undefined) {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (typeof watchedAt !== 'string') {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (watchedAt.indexOf('/') !== 2 || watchedAt.length !== 10) {
    return response.status(HTTP_BAD_REQUEST_STATUS2).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = {
  validadeToken,
  validadeName,
  validadeAge,
  validadeTalk,
  validadeDate,
  validadeRate,
};

  // console.log(typeof watchedAt, watchedAt, !validateDate(watchedAt, 'boolean', 'dd/mm/yyyy'));
  // if (!validateDate(watchedAt, 'boolean', 'dd/mm/yyyy')) {
  //   return response.status(HTTP_BAD_REQUEST_STATUS2).json({
  //     message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  //   });
  // }
