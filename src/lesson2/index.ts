import * as Koa from 'koa';

const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = process.hrtime();
  await next();
  const diff = process.hrtime(start);
  ctx.set('X-Response-Time', `${diff}`);
});

// logger
app.use(async (ctx, next) => {
  const start = process.hrtime();
  await next();
  const diff = process.hrtime(start);
  console.log(`${ctx.method} ${ctx.url} - ${diff}`);
});

// response
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000, () => {
  console.log('koa app start at port 3000');
});