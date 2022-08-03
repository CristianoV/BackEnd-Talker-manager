const HTTP_BAD_REQUEST_STATUS = 400;

function validadeEmail(_request, response, next) {
    const { email } = _request.body;
    const re = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
if (!email) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
        message: 'O campo "email" é obrigatório',
      });
  }
  if (!re.test(email)) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
        message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
  }

  function validadePassword(_request, response, next) {
    const { password } = _request.body;
  if (!password) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
        message: 'O campo "password" é obrigatório',
      });
  }
  if (password.length < 6) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
  }
    next();
  }

  module.exports = { validadeEmail, validadePassword };
