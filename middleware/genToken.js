const crypto = require('crypto');

function genToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = genToken;