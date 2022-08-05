const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const { validadeEmail, validadePassword } = require('./validateLogin');
const { validadeToken, validadeName, validadeAge, validadeTalk,
  validadeDate, validadeRate } = require('./validadeTalkerPost');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_GOD_STATUS = 201;
const HTTP_VERY_GOD_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 404;
const PORT = '3000';
const talkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// não remova esse endpoint, e para o avaliador funcionar

app.get('/talker', (_request, response) => {
  const allTalkers = talkers();
  if (allTalkers) {
    return response.status(HTTP_OK_STATUS).json(allTalkers);
  }
  return response.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/search', validadeToken, (_request, response) => {
  const { q } = _request.query;
  const allTalkers = talkers();

  console.log(q);

  if (!q) {
    return response.status(HTTP_OK_STATUS).json(allTalkers);
  }

  const talkerFindName = allTalkers.filter((talkerId) => talkerId.name.includes(q));
  console.log(talkerFindName);

  if (talkerFindName) {
    return response.status(HTTP_OK_STATUS).json(talkerFindName);
  }
  return response.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', (_request, response) => {
  const { id } = _request.params;
  const allTalkers = talkers();
  const talkerFindId = allTalkers.find((talkerId) => talkerId.id === Number(id));
  if (!talkerFindId) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return response.status(HTTP_OK_STATUS).json(talkerFindId);
});

app.post('/talker',
validadeToken, validadeName, validadeAge,
validadeTalk, validadeRate, validadeDate, (_request, response) => {
  const { name, age, talk } = _request.body;
  const allTalkers = talkers();
  const newTalkers = [...allTalkers, { name, age, id: allTalkers.length + 1, talk }];
  fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
  return response.status(HTTP_GOD_STATUS).json(
    { name, age, id: allTalkers.length + 1, talk },
  );
});

app.put('/talker/:id', validadeToken, validadeName,
validadeAge, validadeTalk, validadeRate, validadeDate, (_request, response) => {
  const { id } = _request.params;
  const { name, age, talk } = _request.body;
  const numberId = Number(id);
  const allTalkers = talkers();
  const talkerFindId = allTalkers.findIndex((talkerId) => talkerId.id === Number(id));
   allTalkers[talkerFindId] = { name, age, id: numberId, talk };
  fs.writeFileSync('talker.json', JSON.stringify(allTalkers));

  return response.status(HTTP_OK_STATUS).json({ name, age, id: numberId, talk });
});

app.delete('/talker/:id', validadeToken, (_request, response) => {
  const { id } = _request.params;
  const allTalkers = talkers();
  const talkerFindId = allTalkers.filter((talkerId) => talkerId.id !== Number(id));
  fs.writeFileSync('talker.json', JSON.stringify(talkerFindId));

  return response.status(HTTP_VERY_GOD_STATUS).json();
});

app.post('/login', validadeEmail, validadePassword, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
