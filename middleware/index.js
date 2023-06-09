function validEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validPassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function validAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number.isInteger(age) && age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}
function validName(req, res, next) {
  const { name } = req.body;
  if (!name || name === ' ') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || authorization === ' ') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16 || authorization.length > 16) {
    return res.status(401).json({ message: 'Token inválido' });
}
next();
}
function validTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || talk === ' ') {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
}
const data = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
function validWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;

  if (!watchedAt || watchedAt === ' ') { 
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!data.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}
function validRate(req, res, next) {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
}

module.exports = {
  validEmail,
  validPassword,
  validAge,
  validName,
  validToken,
  validTalk,
  validWatchedAt,
  validRate,
};
