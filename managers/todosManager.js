const knex = require('./knexManager');

module.exports = {
  getTodos(listId) {
    return knex('todos').where({ listId });
  }
};
