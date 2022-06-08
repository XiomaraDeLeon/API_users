const boom = require('@hapi/boom')

class UserService{
  constructor(){
    this.users = []
    this.id = 1
  }

  async create(data){
    const newUser = {
      id: this.id++,
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  async userList(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users)
      }, 1000)
    })
  }

  async userOne(id){
    const user = this.users.find(item => item.id === id)
    if(!user){
      throw boom.notFound('user not found')
    }
    if(user.isBlock){
      throw boom.conflict('user is block')
    }
    return user
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id)
    console.log(index);
    if(index === -1){
      throw boom.notFound('user not found')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  async delete (id){
    const index = this.users.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('user not found')
    }
    this.users.splice(index, 1)
    return { id }
  }

  login (correo, contrasenia){
    const index = this.users.findIndex(item => item.correo == correo && item.contrasenia == contrasenia)
    console.log(correo, contrasenia)
    return index
  }

}

module.exports = UserService
