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
      todos,
      listId: id,
    };
    await ctx.render('list', viewContext);
  },
  async indexAction(ctx) {
    const lists = await listsManager.getAll();
    await ctx.render('index', { title: 'home', lists });
  },
  async addListAction(ctx) {
    await listsManager.addList(ctx.request.body);
    ctx.redirect('/');
  },
  async deleteListAction(ctx) {
    await listsManager.delete(ctx.request.body.listId);
    ctx.redirect('/');
  },
  async addTodoAction(ctx) {
    const body = ctx.request.body;
    await todosManager.addTodo(body);
    ctx.redirect(`/list/${body.listId}`);
  },
  async checkTodoAction(ctx) {
    const { body } = ctx.request;
    const { todoId } = body;
    if (body.done) {
      await todosManager.check(todoId);
    } else {
      await todosManager.unCheck(todoId);
    }
    ctx.redirect('/list/6');
  }
};
