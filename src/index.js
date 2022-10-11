const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const genToken = require('../middleware/genToken');
const { validEmail, validPassword, validAge,
  validName, validToken, validTalk, validWatchedAt, validRate } = require('../middleware/index');

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

app.get('/talker/search', validToken, (req, res) => {
  const { q } = req.query;
  const palestrantes = fs.readFileSync(talkerJson, 'utf-8');
  const resultBusca = JSON.parse(palestrantes).filter((palestrante) => 
    palestrante.name.includes(q));

  return res.status(200).json(resultBusca);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const palestrantes = fs.readFileSync(talkerJson, 'utf-8');

  const talkerId = JSON.parse(palestrantes).find(
    (palestrante) => palestrante.id === Number(id),
  );

  if (!talkerId) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.post('/login', validEmail, validPassword, (req, res) => {
  const token = genToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.delete('/talker/:id', validToken, (req, res) => {
  const { id } = req.params;
  const palestrantes = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  const filterTalkers = palestrantes.filter((talker) => talker.id !== Number(id));
  fs.writeFileSync('./src/talker.json', JSON.stringify(filterTalkers));

  return res.status(204).json();
});

app.use(validToken, validAge, validName, validTalk, validWatchedAt, validRate);

app.post('/talker', (req, res) => {
console.log(validToken);
  const { age, name, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talker = {
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const palestrantes = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));
  const newTalker = { ...talker, id: palestrantes.length + 1 };
  palestrantes.push(newTalker);
  fs.writeFileSync('./src/talker.json', JSON.stringify(palestrantes));
  return res.status(201).json(newTalker);
}); 

app.put('/talker/:id', (req, res) => {
  const { age, name, talk } = req.body;
  const { watchedAt, rate } = talk;
  const { id } = req.params;
  const palestrantes = JSON.parse(fs.readFileSync(talkerJson, 'utf-8'));
  palestrantes[Number(id) - 1] = {
    ...palestrantes[Number(id) - 1],
    id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  fs.writeFileSync(talkerJson, JSON.stringify(palestrantes));

  return res.status(200).json(palestrantes[Number(id) - 1]);
});

app.listen(PORT, () => {
  console.log('Online');
});