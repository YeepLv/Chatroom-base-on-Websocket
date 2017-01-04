
module.exports = {
    'GET /':async (ctx,next)=>{
        ctx.render('index.html');
        await next();
    },
    'GET /index.html':async (ctx,next)=>{
        ctx.render('index.html');
        await next();
    }
}