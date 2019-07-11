const listsManager = require('../managers/listsManager');
const todosManager = require('../managers/todosManager');

module.exports = {
  async listAction(ctx) {
    const { id } = ctx.params;
    const [{ name }, todos] = await Promise.all([
      listsManager.findById(id),
      todosManager.getTodos(id),
    ]);
    const viewContext = {
      title: 'list',
      name,
      todos: todos.map(({ text }) => text),
    };
    await ctx.render('list', viewContext);
  },
  async indexAction(ctx) {
    const lists = await listsManager.getAll();
    await ctx.render('index', { title: 'home', lists });
  },
  async addListAction() {

  },
  async editTodosAction() {

  }
};
