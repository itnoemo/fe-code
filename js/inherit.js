// 创建父类
function Parent(name){
	this.name = name ;//实例属性
	this.sayHi = function(){
		console.log("我是一个实例的方法");
	}
}
Parent.prototype.sayHello = function(){
	console.log("我是父类原型上一个sayHello方法，哈哈");
}

//创建子类
function Child(name,age){
	//继承父类的实例的属性和方法
	Parent.call(this,name);
	//Parent.call(this,argument);
	this.age = age
}
//继承父类上原型的实例
//Object.create()//es6创建一个对象,直接继承父类里面的属性和方法
Child.prototype = Object.create(Parent.prototype);
//实例的原型重新指向自己，不然指向的是Parent
Child.prototype.constructor = Child;
//第二种方法也可以继承
//Child.prototype.__proto__ = Parent.prototype;
let child = new Child("嘿嘿",20);
console.log(child.name); //嘿嘿
console.log(chid.age);//20
console.log(child.sayHi());//我是一个实例的方法
console.log(child.sayHello());//我是父类原型上一个sayHello方法，哈哈
console.log(child.__proto__ === Child.prototype);//true
console.log(child.constructor === Child);//true child实例的constructor指向构造函数的原型
console.log(Child.prototype.constructor === Child);//true





