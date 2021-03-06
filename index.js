const Koa = require('koa');
var Router = require('koa-router');
const render = require('koa-ejs');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const path = require('path');
const indexController = require('./controllers/indexController');

const app = new Koa();
app.keys = ['some secret hurr'];
app.use(session({}, app));
var router = new Router();
render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  // debug: true
});

router
  .get('/', indexController.indexAction)
  .get('/login', indexController.showLoginAction)
  .post('/login', indexController.loginAction)
  .get('/list/:id', indexController.listAction)
  .post('/del-list', indexController.deleteListAction)
  .post('/add-list', indexController.addListAction)
  .post('/add-todo', indexController.addTodoAction)
  .post('/check-todo', indexController.checkTodoAction);

app
  .use(bodyparser())
  .use(router.routes())
  .listen(3000);
