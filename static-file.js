'use strict'

const fs = require('mz/fs');
const path = require('path');
const mime = require('mime');

function staticFiles(){
    return async (ctx,next)=>{
        let rpath = ctx.request.path;
        //console.log(rpath);
        if(rpath.startsWith('/statics')){
            let filepath = path.join(__dirname,rpath);
            if(fs.existsSync(filepath)){
                ctx.response.type = mime.lookup(filepath);
                ctx.response.body = fs.readFileSync(filepath);
            }else{
                ctx.response.body = '404 not found';
            }
            
        }else if(rpath.startsWith('/view')){
            let filepath = path.join(__dirname,rpath);
            if(fs.existsSync(filepath)){
                ctx.response.type = mime.lookup(filepath);
                ctx.response.body = fs.readFileSync(filepath);
            }else{
                ctx.response.body = '404 not found';
            }
        }else{
            await next();
        }
    }
}


module.exports = staticFiles;