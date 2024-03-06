class Man {
  protected gender: string
}
class User extends Man {
  // 公开
  public name: string
  // 私有
  private DNA: string = 'aaaa'

  readonly age: number = 1
  setGender() {
    this.gender = 'man'
  }

}
let user = new User()
user.name = 'Tom'
// 外面不可以修改 但是在子类里面是可以修改的
// user.gender='man'
// 这里是错误的 私有的是不可以修改的
// user.DNA='aaaaa'

// user.age = 10
console.log(user.age)