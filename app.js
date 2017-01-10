'use strict'

const Koa = require('koa');
const fs = require('mz/fs');
const path = require('path');
const Cookies = require('cookies');
const static_file = require('./static-file');
const bodyparser = require('koa-bodyparser');
const template = require('./template');
const controllerMid = require('./controller');

const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello</h1>'
})
app.use(static_file());

app.use(bodyparser());

app.use(template('view', {
    noCache: true,
    watch: true
}))

app.use(controllerMid());

// app.use(async (ctx,next)=>{
//     ctx.render('index.html');
// })

let server = app.listen(3000);

const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    server: server
});

function parserUser(obj) {
    if (!obj) {
        return;
    }
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
        console.log(`s is : ${s}`);
    }
    if (s) {
        try {
            let user = JSON.parse(s);
            return user;
        } catch (e) {
            console.log(`error : ${e}`);
        }
    }
}

function createMessage(user, type, content) {
    var msg = {
        user: user,
        type: type,
        content: content
    }
    return msg;
}

wss.broadcast = function (message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    })
}



wss.on('connection', function (ws) {
    console.log('CLIENT CONNECT');
    let user = parserUser(ws.upgradeReq);
    let message = createMessage(user, 'join', 'joined');
    let userMessage = createMessage(user, 'getUsers', JSON.stringify(wss.clients.map((client)=>{console.log(this);return client.user})));
    ws.send(JSON.stringify(userMessage));
    wss.broadcast(message);
    ws.user = user;
    ws.wss = wss;

    ws.on('message', onMessage);
    ws.on('close', onClose);
})

function onMessage(message) {
    let msg = createMessage(this.user, 'send', message);
    this.wss.broadcast(msg);
}

function onClose() {
    let msg = createMessage(this.user, 'left', 'left the room');
    this.wss.broadcast(msg);
}
app.wss = wss;

console.log("app listen at port 3000");