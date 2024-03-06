function say<T>(str: T) {
  console.log(str)
}

say<number>(1)
say<boolean>(false)

interface IUser {
  name: string
}
say<IUser>({ name: 'Tom' })

function say1<T>(str: T): T {
  return str
}

let str = say1<IUser>({ name: 'Jack' })
console.log(str)