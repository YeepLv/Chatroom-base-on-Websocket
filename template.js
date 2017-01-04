'use strict'

const nunjucks = require('nunjucks');

function createEnv(path,opts){
    var
        autoescape = opts.autoescape || true,
        throwOnUndefined = opts.throwOnUndefined || false,
        watch = opts.watch || false,
        noCache = opts.noCache || false,
        env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path,{
            watch:watch,
            noCache:noCache
        }),{
            autoescape:autoescape,
            throwOnUndefined:throwOnUndefined
        });
    if(opts.filters){
        for(var f of opts.filters){
            env.addFilter(f,opts.filters[f]);
        }        
    }

    return env;
}

function template(path,opts){
    var env = createEnv(path,opts);

    return async (ctx,next)=>{
        ctx.render = function(view,model){
            ctx.response.type = 'text/html';
            console.log(view);
            ctx.response.body = env.render(view,Object.assign({},ctx.state||{},model||{}));
        }
        await next();
    }
}


module.exports = template;