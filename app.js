'use strict'

const Koa = require('koa');
const fs = require('mz/fs');
const path = require('path');
const static_file = require('./static-file');
const bodyparser = require('koa-bodyparser');
const template = require('./template');
const controllerMid = require('./controller');

const app = new Koa();

app.use(async (ctx,next)=>{
    await next();
   // ctx.response.type = 'text/html';
   // ctx.response.body = '<h1>Hello</h1>'
})
app.use(static_file());

app.use(bodyparser());

app.use(template('view',{
    noCache:true,
    watch:true
}))

app.use(controllerMid());

// app.use(async (ctx,next)=>{
//     ctx.render('index.html');
// })

app.listen(3000);
console.log("app listen at port 3000");