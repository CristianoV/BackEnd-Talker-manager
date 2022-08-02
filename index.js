const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  // if (talkers) {
  //   return response.status(HTTP_OK_STATUS).json(talkers);
  // }
  // return response.status(HTTP_OK_STATUS).send([]);
    return response.status(HTTP_OK_STATUS).send(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
