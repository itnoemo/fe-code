function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    });
};

class SuperTask {
    constructor(maxTaskNum) {
        // 设置同一时间可运行的任务数
        this.maxTaskNum = maxTaskNum;
        // 任务队列
        this.taskQueue = [];
        // 正在运行任务数
        this.taskRunning = 0;
    }
    // 添加方法
    add(task){
        return new Promise((resolve, reject) => {
            this.taskQueue.push({
                task,
                resolve,
                reject
            });
            this._run();
        });
    }
    // 运行
    _run(){
        // 当前运行的任务数小于最大的任务数 && 有排队的
        while(this.taskRunning < this.maxTaskNum && this.taskQueue.length) {
            // 取出最先排队的任务
            const { task, resolve, reject } = this.taskQueue.shift();
            this.taskRunning++;
            Promise.resolve(task())
            .then(resolve, reject)
            .finally(() => {
                this.taskRunning--;
                this._run();
            })
        }
    }
    
}

const superTask = new SuperTask();
function addTask(time, name) {
    superTask
    .add(() => timeout(time))
    .then(() => {
        console.log(`任务${name}执行完成`);
    })
}
addTask(5000, 1); // 5000ms后输出: 任务1执行完成
addTask(1000, 2); // 1000ms后输出: 任务2执行完成
addTask(2000, 3); // 3000ms后输出: 任务3执行完成
addTask(3000, 4); // 6000ms后输出: 任务4执行完成
addTask(4000, 5); // 9000ms后输出: 任务5执行完成
