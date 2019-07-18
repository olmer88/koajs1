const knex = require('./knexManager');

const getQueryBuilder = () => knex('todos');

module.exports = {
  getTodos: (listId) => getQueryBuilder().where({ listId }),
  addTodo: (todo) => getQueryBuilder().insert(todo),
};
