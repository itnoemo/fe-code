// 人
class Person {
    #name; // 姓名
    #type; // 类型
    #status = 'pending'; // 状态
    constructor(name, type) {
        // 姓名
        this.#name = name;
        this.#type = type;
    }
    get #decoratedMessage() {
        return `🎬${this.#message}🛑`;
    }
    set #decoratedMessage(msg) {
    this.#message = msg;
    }
    // 设置状态
    setStatus(status) {
        this.#status = status;
    }
}
// 工作人员
class Worker extends Person {
    #winNum = 0; // 窗口编号
    constructor(name, winNum) {
        super(name, 'worker');
        this.#winNum = winNum;
        this.setStatus('fulfilled');
    }
}
// 需要办理的人员
class Needer extends Person {
    constructor(name) {
        super(name, 'needer');
    }
}

// 队列
class Queue {
    #queueWindow = []; // 窗口
    #queuePending = [] // 排队
    #queueRuning = []; // 正在办理
    #queueFulliled = []; // 已办完
    constructor(windowNum = 3) {
        // 初始化窗口信息
        this.#queueWindow = new Array(windowNum).fill(null);
    }
    // 设置工作人员窗口
    setWorkerToWindow(name, winNum = 0) {
        this.#queueWindow[winNum-1] = new Worker(name, winNum);
    }
    // 将当前办理的人设为已完成
    finish(currWindowNum) {
        // 当前窗口办理完的人
        const p = this.#queueRuning[currWindowNum-1];
    }
    // 叫号
    receiveTask(currWindowNum) {
        // 当前窗口办理完的人
        const p = this.#queueRuning[currWindowNum-1];

    }
}

// 暴露内容(外面可调用)
// function addTask(name) {
//     console.log(`${name}开始排队`);
//     console.log(`${name}办理中`);
//     console.log(`${name}办理完成`);
// }
// addTask('001');
// addTask('002');
// addTask('003');
// addTask('004');