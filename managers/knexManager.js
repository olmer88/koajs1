module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'koajs1'
  },
  pool: { min: 0, max: 7 },
});
