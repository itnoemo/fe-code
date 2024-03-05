// 观察者模式
// 定义主体
class Subject {
    constructor() {
        this.observers = [];
    }
    // 添加
    add(observer) {
        this.observers.push(observer);
    }
    // 移除
    remove(observer) {
        this.observers.splice(this.observers.findIndex(item => observer === item), 1);
    }
    // 通知
    notify() {
        this.observers.forEach(observer => {
            observer.update();
        });
    }
}
// 定义观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    // 更新
    update() {
        console.log(`my name is ${this.name}`);
    }
}

//测试
let sub = new Subject();
let obs1 = new Observer('leaf111');
let obs2 = new Observer('leaf222');
sub.add(obs1);
sub.add(obs2);
sub.notify();