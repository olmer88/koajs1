const Koa = require('koa');
var Router = require('koa-router');
const render = require('koa-ejs');
const path = require('path');

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
  .get('/', async function (ctx) {
    await ctx.render('index', { title: 'home' });
  })
  .get('/list', async function (ctx) {
    await ctx.render('list', { title: 'list' });
  });

app.use(router.routes());
app.listen(3000);
