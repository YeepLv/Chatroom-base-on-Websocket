module.exports = {
    'POST /signin':async (ctx,next)=>{
        var username = ctx.request.username,
            password = ctx.request.password;
        if(password === '12345'){
            ctx.render('signin-ok.html');
        }else{
            ctx.render('signin-fail.html');
        }
    }
}