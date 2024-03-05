
// 定义状态
const STATUS_PENDING = 'pending'; // 进行中
const STATUS_FULFILLED = 'fulfilled'; // 已成功
const STATUS_REJECTED = 'rejected'; // 已失败 

class MyPromise {
    constructor(handle) {
        // 校验handle是否为函数
        if (typeof handle !== 'function') {
            throw new Error('构造函数参数不为函数类型!');
        }
        // 状态
        this.state = STATUS_PENDING;
        // 成功返回值列表
        this.fulValue = undefined;
        // 失败返回值列表
        this.rejectError = undefined;

        // 设置为已成功状态
        let resolve = value => {
            this.state = STATUS_FULFILLED;
            this.fulValue = value;
        }
        // 设置为以失败状态
        let reject = error => {
            this.state = STATUS_REJECTED;
            this.rejectError = error;
        }
        try {
            handle(resolve, reject);
        } catch(error) {
            reject(error);
        }
    }

    then(onFullfilled, onRejected) {
        // 状态为进行中
        if (this.state === STATUS_PENDING) {
            return;
        }
        return new MyPromise((resolve, reject) => {
            // 状态为已成功
            if (this.state === STATUS_FULFILLED) {
                try {
                    onFullfilled && onFullfilled(this.fulValue);
                    resolve()
                } catch (error) {
                    // 若异常处理函数已存在
                    if (onRejected) {
                        onRejected(error);
                        return resolve();
                    }
                    // 否则 直接抛出异常
                    return reject(error);
                }
                return;
            }
            // 已拒绝
            // 若异常处理函数已存在
            if (onRejected) {
                onRejected(error);
                return resolve();
            }
            // 否则 直接抛出异常
            return reject(error);
        });
    }
    catch(error) {
        // 状态不为已成功
        if (this.state === STATUS_REJECTED) {
            onRejected && onRejected(this.rejectError);
        }
        console.log('catch', error);
    }
}
const p1 = new MyPromise((resolve, reject) => {
    resolve(1);
});
p1.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});
p1.then((res) => {
    console.log('22222Success', res);
}, (err) => {
    console.log('22222Error', err);
});