'use strict'

const Koa = require('koa');

const static_file = require('./static-file');

const app = new Koa();

app.use(async (ctx,next)=>{
    await next();
   // ctx.response.type = 'text/html';
   // ctx.response.body = '<h1>Hello</h1>'
})
app.use(static_file());

app.listen(3000);
console.log("app listen at port 3000");