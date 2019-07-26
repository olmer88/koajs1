const knex = require('./knexManager');

const getQueryBuilder = () => knex('todos');

module.exports = {
  getTodos: (listId) => getQueryBuilder().where({ listId }),
  addTodo: (todo) => getQueryBuilder().insert(todo),
  check: todoId => getQueryBuilder().update({ done: new Date() }).where({ todoId }),
  unCheck: todoId => getQueryBuilder().update({ done: null }).where({ todoId }),
};
