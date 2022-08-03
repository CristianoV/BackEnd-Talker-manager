const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// não remova esse endpoint, e para o avaliador funcionar

app.get('/talker', (_request, response) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  if (talkers) {
    return response.status(HTTP_OK_STATUS).json(talkers);
  }
  return response.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', (_request, response) => {
  const { id } = _request.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talkerFindId = talkers.find((talkerId) => talkerId.id === Number(id));
  if (!talkerFindId) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return response.status(HTTP_OK_STATUS).json(talkerFindId);
});

app.post('/login', (_request, response) => {
  const { email, password } = _request.body;
  const re = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  const token = crypto.randomBytes(8).toString('hex');

  if (email && re.test(email) && password) {
    return response.status(HTTP_OK_STATUS).json({ token });
  }
  return response.status(HTTP_BAD_REQUEST_STATUS).send({
    message: 'Preencha todos os campos',
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
