const bcrypt = require('bcrypt');
const config = require('../config');

const hash = (value) => bcrypt.hash(value, config.config.passwordEncryption.secret);


const compare = (value, hashedValue) => bcrypt.compare(value, hashedValue);

exports.BcryptService = {
  hash,
  compare,
};

//export default BcryptService;