// 检查是否是空对象
const obj = {};

console.time('stringify');
console.log(JSON.stringify(obj) === '{}'); // 5.665ms
console.timeEnd('stringify');

console.time('Object.keys');
console.log(Object.keys(obj).length === 0); // 0.058ms
console.timeEnd('Object.keys');