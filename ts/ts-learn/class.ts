interface IMan {
  name: string
}

abstract class Man {
  say(): string {
    return '我是 abstract class'
  }
}

class Father extends Man implements IMan {
  name: string
}

class Child extends Father {


}

let child = new Child()
let str=child.say()
console.log(str)