interface IUser {
  name: string
  age: number
}

let user: IUser = { name: 'hanyun', age: 32 }
console.log(user)

// 接口的继承 
interface IStudent extends IUser {
  readonly DNA: string
  CET4: boolean
  CET6?: boolean
}
let student1: IStudent = { name: 'hanyun', DNA: 'aaaaa', age: 32, CET4: true }
let student2: IStudent = { name: 'hanyun', DNA: 'assasaaaaa', age: 32, CET4: true, CET6: true }

console.log(student1, student2)

// 可以修改的
student1.CET6 = true
console.log(student1, student2)

// 不可以修改
// student1.DNA = "mdakldmak"
