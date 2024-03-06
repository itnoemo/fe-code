
// 接口重在于约束
interface IClass {
  name: string
  say(age: number)
}

class User implements IClass {
  name: string
  say(age: number): void {
  }
}