const knex = require('./knexManager');

const getQueryBuilder = () => knex('lists');

module.exports = {
  async findById(id) {
    const lists = await getQueryBuilder().where({ listId: id });
    return lists[0];
  },
  getAll: () => getQueryBuilder(),
  async addList(list) {
    await getQueryBuilder().insert(list);
  },
  async delete(listId) {
    await getQueryBuilder().where('listId', listId).del();
  }
};

