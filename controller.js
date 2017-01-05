'use strict'

const router = require('koa-router')();

const fs = require('mz/fs');


function controllerMid() {
    var controllers = fs.readdirSync(__dirname + '/controller');

    for (var c of controllers) {
        if (c.endsWith('.js')) {
            let mapping = require(__dirname + '/controller/' + c);
            for (var url in mapping) {
                if (url.startsWith('GET')) {
                    var path = url.substring(4);
                    router.get(path, mapping[url]);
                    console.log('register URL mapping:GET'+path);
                } else if (url.startsWith('POST')) {
                    var path = url.substring(5);
                    router.post(path, mapping[url]);
                }
            }
        }
    }

    return router.routes();
}

module.exports = controllerMid;