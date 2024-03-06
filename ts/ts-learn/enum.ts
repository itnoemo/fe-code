enum Play {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Play.UP, Play.DOWN)

enum Play1 {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Play1.UP, Play1.DOWN)


console.log(Play1.UP === 0)

// 可以比较的
console.log(Play1.UP === Play1.UP)

// 错误示例
// console.log(Play1.UP === Play.UP)
