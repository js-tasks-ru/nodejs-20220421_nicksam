const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const subscribers = [];

router.get('/subscribe', async (ctx, next) => {
  ctx.body = await new Promise((resolve, reject) => {
    subscribers.push(resolve);
  });
});

router.post('/publish', async (ctx, next) => {
  const msg = ctx.request.body.message;
  if (msg) ctx.body = subscribers.forEach((item) => item(msg));
});

app.use(router.routes());

module.exports = app;
