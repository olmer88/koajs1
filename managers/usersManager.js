const crypto = require('crypto');
const knex = require('./knexManager');

const getQueryBuilder = () => knex('users');

module.exports = {
  getUser: ({ email, password }) => {
    return getQueryBuilder().where({
      email,
      password: crypto.createHash('md5').update(password).digest('hex'),
    });
  },
};
