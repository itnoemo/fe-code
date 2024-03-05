/**
 * @file 防抖
 * @description
 *      规定函数至少间隔多久执行。
        函数执行过一次后，在n秒内不能再次执行，否则推迟函数执行
        下一次函数调用将清除上一次的定时器，并用setTimeout重新计时
 */

// 简单的防抖动函数
function debounce(func, wait) {
    let timeout;  // 定时器变量
    return function() {
        clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
        timeout = setTimeout(func, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
    };
}
//事件处理程序
function realFunc(){
    console.log("Success");
}
const input = document.getElementById('input');
input.addEventListener('keydown',debounce(realFunc,500));

/**
 * @file 节流
 * @description 
 *      规定函数在某时间段内最多执行一次
        函数在n秒内最多执行一次
        下一次函数调用将清除上一次的定时器
        若函数执行的时间间隔小于等于规定时间间隔则用setTimeout 在规定时间后再执行
        若函数执行的时间间隔大于规定时间间隔则执行函数，并重新计时
 */

 //节流函数
function throttle(func,interval){
    let timeout;
    let startTime = new Date();
    return function (){
        clearTimeout(timeout);
        let curTime = new Date();
        if(curTime - startTime <= interval){
            //小于规定时间间隔时，用setTimeout在指定时间后再执行
            timeout = setTimeout(()=>{
                func();
            },interval)
        } else {
            //重新计时并执行函数
            startTime = curTime;
            func()
        }
    }
}
//事件处理程序
function realFunc(){
    console.log('success')
}
window.addEventListener('scroll',throttle(realFunc,100));