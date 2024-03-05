// index.js
let WebSocketServer = require("ws").Server;
let wss = new WebSocketServer({ port: 3000 });

// 创建保存所有已连接到服务器的客户端对象的数组
let clients = [];

// 为服务器添加connection事件监听，当有客户端连接到服务端时，立刻将客户端对象保存进数组中。
wss.on("connection", function (client) {
  console.log("一个客户端连接到服务器");
  if (clients.indexOf(client) === -1) {
    clients.push(client);
    // 接收客户端发送的消息
    client.on("message", function (msg) {
      console.log("收到消息:" + msg);
      // 将消息发送给非自己的客户端
      for (let key of clients) {
        if (key != client) {
          key.send(msg.toString());
        }
      }
    });
  }
});