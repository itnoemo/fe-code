window._eventBus.on('message', (res) => {
	console.log('订阅的消息事件触发了，数据为：' + res.data);
});