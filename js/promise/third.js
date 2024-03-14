// 第一步: 初定
class MyPromise1 {
    // 初始化传递一个执行器
    constructor(executor) {
        this._status = 'pending'; // 当前状态
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    // 成功函数
    _resolve(data) {
        this._status = 'fulfilled';
        console.log('已完成，', data);
    }
    // 异常函数
    _reject(error) {
        this._status = 'rejected';
        console.log('失败了，', error);
    }
};
const p1 = new MyPromise1((resolve, reject) => {
    resolve(1);
});
const p2 = new MyPromise1((resolve, reject) => {
    reject('2、Error');
});
// console.log(p1);
// console.log(p2);


// 第二步: 优化
const STATE_PENDING = 'pending'; // 进行中
const STATE_FULFILLED = 'fulfilled'; // 已完成
const STATE_REJECTED = 'rejected'; // 已拒绝
class MyPromise2 {
    /**
     * @param {Function} executor 执行器
     */
    constructor(executor) {
        this._state = STATE_PENDING; // 当前状态
        this._value = null; // 数据
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }
    // 改变状态
    _changeState(state, data) {
        // 由于状态不可逆转性质，故此只有在pending时才会执行
        if (this._state !== STATE_PENDING) {
            return;
        }
        // 设置参数
        this._state = state;
        this._value = data;
    }
    // 成功函数
    _resolve(data) {
        this._changeState(STATE_FULFILLED, data);
    }
    // 异常函数
    _reject(error) {
        this._changeState(STATE_REJECTED, error);
    }
};
const p3 = new MyPromise2((resolve, reject) => {
    throw 3;
});
const p4 = new MyPromise2((resolve, reject) => {
    reject('4、Error');
});
// console.log(p3);
// console.log(p4);


function isPromise(obj) {
    return !!(obj && typeof obj === 'object' && typeof obj.then === 'function')
}
// 第三步: then
class MyPromise3 {
    /**
     * @param {Function} executor 执行器
     */
    constructor(executor) {
        this._state = STATE_PENDING; // 当前状态
        this._value = null; // 数据
        this._queueMicro = []; // 微任务队列
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }
    /**
     * 
     * @param {Object} task 任务对象信息
     */
    _runTask(task) {
        const { executor, state, resolve, reject } = task;
        // 根据特性，fulfilled状态只将resolve回调函数放到微队列中， rejected状态只将reject函数放到微队列中
        setTimeout(() => {
            // 判断当前实例状态和task状态不一致时不执行
            if (state !== this._state) {
                return;
            }
            // 若传递的执行器不是函数类型，则不执行
            if (typeof executor !== 'function') {
                // 根据状态穿透特性
                this._state === STATE_FULFILLED ? resolve(this._value) : reject(this._value);
                return;
            }
            try {
                const result = executor(this._value);
                // 若返回值是promise，则状态结果依据返回的promise
                if (isPromise(result)) {
                    result.then(resolve, reject);
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error);
            }
        }, 0);
    }
    /**
     * 循环任务队列
     */
    _loopQueueTask() {
        // 若当前状态为pending的时候则不处理
        if (this._state === STATE_PENDING) {
            return;
        }
        while(this._queueMicro[0]) {
            this._runTask(this._queueMicro[0]);
            this._queueMicro.shift();
        }
    }
    /**
     * 
     * @param {Function} onResove 
     * @param {Function} onReject 
     */
    then(onResove, onReject) {
        return new MyPromise3((resolve, reject) => {
            this._queueMicro({
                onResove,
                state: STATE_FULFILLED,
                resolve,
                reject
            });
            this.queueMicro({
                onReject,
                state: STATE_REJECTED,
                resolve,
                reject
            });
            // 每次变化后开始执行任务
            this._loopQueueTask();
        });
    }
    // 改变状态
    _changeState(state, data) {
        // 由于状态不可逆转性质，故此只有在pending时才会执行
        if (this._state !== STATE_PENDING) {
            return;
        }
        // 设置参数
        this._state = state;
        this._value = data;
        this._loopQueueTask();
    }
    // 成功函数
    _resolve(data) {
        this._changeState(STATE_FULFILLED, data);
    }
    // 异常函数
    _reject(error) {
        this._changeState(STATE_REJECTED, error);
    }
};
const p5 = new MyPromise3((resolve, reject) => {
    resolve(5);
});
const p6 = new MyPromise3((resolve, reject) => {
    reject('6、Error');
});
p5.then(
    (data) => {console.log('resove', data);},
    (error) => {console.error('error', error);},
);