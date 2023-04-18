const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const JWT_SECRET_DEV = 'extra-secret-key';

module.exports = {
  DB_ADDRESS,
  JWT_SECRET_DEV,
};
