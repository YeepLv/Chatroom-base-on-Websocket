
$(function () {

    var chatPanel = new Vue({
        el:"#chatPanel",
        data:{
            messageList:[]
        }
    })

    var userPanel = new Vue({
        el:"#userPanel",
        data:{
            userList:[]
        }
    })

    let ws = new WebSocket('ws://localhost:3000');

    // ws.on('open',function(){

    // })

    ws.onmessage = function (e) {
        var message = JSON.parse(e.data);
        switch (message.type) {
            case 'join':
                console.log(`${message.user.username} ${message.content}`);
                chatPanel.messageList.push({text:`${message.user.username} ${message.content}`});
                userPanel.userList.push({text:message.user.username});
                break;
            case 'send':
                console.log(`${message.user.username} say ${message.content}`);
                chatPanel.messageList.push({text:`${message.user.username} say ${message.content}`});
                break;
            case 'left':
                console.log(`${message.user.username} ${message.content}`);
                chatPanel.messageList.push({text:`${message.user.username} ${message.content}`});
                for(var i=0;i<userPanel.userList.length;i++){
                    if(userPanel.userList[i].text===message.user.username){
                         userPanel.userList.splice(i,1);
                         break;
                    }
                }
               
                break;
            case 'getUsers':
                var userList = JSON.parse(message.content);
                userList.forEach(function(user){
                    userPanel.userList.push({text:user.username});
                })
                break;
        }
    }

    document.getElementById('sendbtn').onclick = function () {
        var content = document.getElementById('inputFrame').value;
        document.getElementById('inputFrame').value = '';
        ws.send(content);
    }


})
