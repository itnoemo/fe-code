function say(str: string) {
  console.log(str)
}
say('hahah')

function say1(str?: string) {
  if (str) {
    console.log(str)
  }
}
say1()
say1('我是say1')

function say2(str: string = 'haha') {
  console.log(str)
}
say2()
say2('我覆盖了默认参数')

// void可以省略不写
function say3(str: string): void {
  console.log(str)
}
say3('say3')

function say4(str: string): string {
  return str
}
let str = say4('say4')
console.log(str)