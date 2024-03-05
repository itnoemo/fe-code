# 通信方式
## BroadcastChannel
- 概念:
    - 运行在 Web Worker 中的 接口代理了一个命名频道，可以让指定 origin 下的任意 browsing context 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 message 事件，消息可以广播到所有监听了该频道的 BroadcastChannel 对象
```javascript
 // 发送方
const bc = new BroadcastChannel('123');
document.getElementById('btnB').addEventListener('click', function () {
    bc.postMessage('hello');
});

// 接收方
const bc = new BroadcastChannel('123');
bc.addEventListener('message', function(event) {
    console.log('我接收到的信息是：', event.data);
});
```
## localStorage
```javascript
/**
 *  优点:
 *      1、同域共享存储空间
        2、持久化将数据存储来浏览器
        3、提供事件监听localStorage变化
    缺点:
        如果多个标签页跨域了，那么数据将无法共享
*/
// 目标页面A
window.addEventListener("storage", (e) => {
    console.info("localStorage发生变化：", e)
});
// 通知页面B
let btnB = document.getElementById("btnB");
let num = 0;
btnB.addEventListener("click", () => {
    localStorage.setItem("num", num++)
});
```
- websocket
    - **特点**:
        - 保持连接状态，HTTP协议是无状态连接，即请求完毕后就会关闭连接。
        - 全双工通信，客户端和服务端平等对待，可以互相通信。
        - 建立在TCP协议之上
        - 没有同源共享策略，即可实现跨域共享
```javascript
// 服务端， node index.js 启动服务
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

// 客户端
// 接收方
// 创建一个websocket连接
var ws = new WebSocket('ws://localhost:3000/');
// WebSocket连接成功回调
ws.onopen = function () {
    console.log("websocket连接成功")
}
// 这里接受服务器端发过来的消息
ws.onmessage = function (e) {
    console.log("服务端发送的消息", e.data)
}
// 发送方
let btnB = document.getElementById("btnB");
let num = 0;
btnB.addEventListener("click", () => {
    ws.send(`客户端B发送的消息:${num++}`);
})
// 创建一个websocket连接
var ws = new WebSocket('ws://localhost:3000/');
// WebSocket连接成功回调
ws.onopen = function () {
    console.log("websocket连接成功")
}

```
## ShareWorker
- 背景:
    - JavaScript是单线程的，单线程有好处也有坏处
    - 为了弥补JS单线程的坏处，webWorker随之被提出，它可以为JS创造多线程环境
- 原理:
    - sharedWorker就是webWorker中的一种，它可以由所有同源页面共享，利用这个特性
- 特点:
    - 跨域不共享，即多个标签页不能跨域
    - 使用port发送和接收消息
    - 如果url相同，且是同一个js，那么只会创建一个sharedWorker，多个页面共享这个sharedWorker
- 缺点:
    - 兼容性不好，慎用
```javascript
// worker.js
const set = new Set()
onconnect = event => {
  const port = event.ports[0]
  set.add(port)

  // 接收信息
  port.onmessage = e => {
    // 广播信息
    set.forEach(p => {
      p.postMessage(e.data)
    })
  }
  // 发送信息
  port.postMessage("worker广播信息")
}

// 接收方
const worker = new SharedWorker('./worker.js')
worker.port.onmessage = e => {
    console.info("pageA收到消息", e.data)
}

// 发送方
const worker = new SharedWorker('./worker.js')
let btnB = document.getElementById("btnB");
let num = 0;
btnB.addEventListener("click", () => {
    worker.port.postMessage(`客户端B发送的消息:${num++}`)
})
```