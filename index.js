const Koa = require('koa');
var Router = require('koa-router');
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();
var router = new Router();
render(app, {
  root: path.join(__dirname, 'view'),
  // layout: 'template',
  layout: false,
  viewExt: 'html',
  cache: false,
  // debug: true
});

router
  .get(new RegExp('/myFirst'), async function (ctx) {
    await ctx.render('index');
  })
  .get('/myFirstRoute', async function (ctx) {
    ctx.body = 'Hello World';
  })
  .get('/', async function (ctx) {
    ctx.body = 'NOT Hello World';
  });

app.use(router.routes());
app.listen(3000);
