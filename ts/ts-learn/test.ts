interface F {
  (name: string): void
}
let f: F = (b: string) => {
  console.log(b)
}
f('a')

interface IMap {
  [index: string]: string
}
let m: IMap = { a: 'a', b: 'b' }
console.log(m)

interface IClass {
  name: string
}
class A implements IClass{
  name: string
}