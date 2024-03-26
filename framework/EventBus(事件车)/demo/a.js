function funCallback() {
	console.log('回调函数');
}
// 订阅事件
window._eventBus.on('message', funCallback);


console.log('3s后触发message事件');
setInterval(() => {
	// 触发事件
	window._eventBus.emit('message', {data: 'hello world'});
	console.log('3s后再次触发message事件');
}, 3000);
