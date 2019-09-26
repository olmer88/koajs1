const moment = require('moment');
const listsManager = require('../managers/listsManager');
const todosManager = require('../managers/todosManager');
const usersManager = require('../managers/usersManager');

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
      moment,
    };
    await ctx.render('list', viewContext);
  },
  async showLoginAction(ctx) {
    await ctx.render('login', { title: 'login' });
  },
  async loginAction(ctx) {
    const { email, password } = ctx.request.body;
    const [user] = await usersManager.getUser({ email, password });
    if (user) {
      ctx.session.userId = user.userId;
      ctx.redirect('/');
      return;
    }
    ctx.redirect('/login');
  },
  async indexAction(ctx) {
    const lists = await listsManager.getAll();
    const { userId } = ctx.session;
    if (!userId) {
      ctx.redirect('/login');
      return;
    }
    await ctx.render('index', { title: 'home', lists, userId });
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
    const { todoId, listId } = body;
    if (body.done) {
      await todosManager.check(todoId);
    } else {
      await todosManager.unCheck(todoId);
    }
    ctx.redirect(`/list/${listId}`);
  }
};
