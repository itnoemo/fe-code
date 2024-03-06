// 接口重在约束
interface IFunc {
  (name: string): void
}
let f: IFunc = (a: string): void => {
  console.log(a)
}
f('aa')