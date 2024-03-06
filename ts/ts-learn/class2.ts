class User<T> {
  info: T
}

interface IInfo {
  name: string
  age: number
}
let user = new User<IInfo>()
user.info = { name: 'Tom', age: 10 }
console.log(user)