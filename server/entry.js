const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const fs = require("fs");
const cors = require('koa-cors');
import {sequelize} from './sql.js'
const app = new koa();
app.use(bodyParser());
const WebSocketServer = require('ws').Server;
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(cors());

//scan controlloer js
var files = fs.readdirSync(__dirname + '/controllers');
var js_files = files.filter((f) => {
    return f.endsWith('.js');
});



for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/controllers/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            // 如果url类似"PUT xxx":
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            // 如果url类似"DELETE xxx":
            var path = url.substring(7);
            router.delete(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}



//websocket 

let wss = new WebSocketServer({ port: 8181 });
//连接用户
let clients = {};

wss.on('connection', function (ws,req) {
    console.log('client connected');

    let user_id=req.url.substr(10);
    console.log(user_id+"上线");
    clients[user_id]= {
        "user_id":user_id,
        "client":ws
    };
    console.log(req.url)
    ws.on('message', function (message) {
        console.log(message)
        console.log(clients.admin)
        if(clients.hasOwnProperty('admin')){
            clients.admin.client.send(message);
        }else{
            console.log('管理员未上线')
        }
        ws.on("error", function (code, reason) {
            console.log(reason);
            console.log("异常关闭");
            delete clients[user_id];
        });
        ws.on("close", function (code, reason) {
            console.log("关闭连接");
            delete clients[user_id];
        });
        
      
    })

})

app.use(json());
app.use(router.routes());
app.listen(7002);
console.log('apiServer started at port 7002...');
