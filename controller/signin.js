module.exports = {
    'POST /signin':async (ctx,next)=>{
        var username = ctx.request.body.username,
            password = ctx.request.body.password;
        if(password === '12345'){
            ctx.render('chatroom.html');
        }else{
            ctx.render('signin-fail.html');
        }

        await next();
    }
}