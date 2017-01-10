var index = 0;

module.exports = {
    'POST /signin':async (ctx,next)=>{
        var username = ctx.request.body.username,
            password = ctx.request.body.password;
        if(password === '12345'){
            ctx.render('chatroom.html');
            index++;
            let username = ctx.request.body.username;
            let user = {
                username : username,
                id:index
            };
            let value = Buffer.from(JSON.stringify(user).toString('base64'));
            console.log(`value is ${value}`);
            ctx.cookies.set('name',value);
        }else{
            ctx.render('signin-fail.html');
        }

        await next();
    }
}