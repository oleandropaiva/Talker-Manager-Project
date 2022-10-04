const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJson = './src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  const palestrantes = fs.readFileSync(talkerJson, 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(palestrantes));
});

app.listen(PORT, () => {
  console.log('Online');
});
