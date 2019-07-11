const Koa = require('koa');
var Router = require('koa-router');
const render = require('koa-ejs');
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
  .post('/add-list', indexController.addListAction);

app.use(router.routes());
app.listen(3000);
