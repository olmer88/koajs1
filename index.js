const Koa = require('koa');
var Router = require('koa-router');
const render = require('koa-ejs');
const bodyparser = require('koa-bodyparser');
const path = require('path');
const indexController = require('./controllers/indexController');

const app = new Koa();
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
  .get('/list/:id', indexController.listAction)
  .get('/del-list', indexController.deleteListAction)
  .post('/add-list', indexController.addListAction)
  .post('/add-todo', indexController.addTodoAction)
  .post('/check-todo', indexController.checkTodoAction);

app
  .use(bodyparser())
  .use(router.routes())
  .listen(3000);
