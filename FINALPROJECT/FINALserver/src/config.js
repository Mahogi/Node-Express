const dotenv = require('dotenv');

dotenv.config();

const {
  SERVER_PORT,
  SERVER_DOMAIN,

  BCRYPT_ROUNDS,
} = process.env;

if ( !SERVER_PORT
  || !SERVER_DOMAIN

  || !BCRYPT_ROUNDS
) {
  throw new Error("Please define constants in '.env' file");
}

exports.config = {
  server: {
    domain: SERVER_DOMAIN,
    port: SERVER_PORT,
  },

  passwordEncryption: {
    secret: Number(BCRYPT_ROUNDS),
  },
};

//export default config;