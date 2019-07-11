const knex = require('./knexManager');

module.exports = {
  async findById(id) {
    const lists = await knex('lists').where({ listId: id });
    return lists[0];
  },
  getAll: () => knex('lists'),
};

