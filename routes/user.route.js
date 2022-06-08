const express = require('express')
const UserService = require('../services/user.service')
const user = express.Router()

const service = new UserService()

user.post('/', async (req, res) => {
  const body = req.body
  const newUser = await service.create(body)
  res.status(201).json(newUser)
})

user.post('/login', (req, res) => {
  const body = req.body
  const newUser = service.login(body.correo, body.contrasenia)
  console.log(newUser);
  if (newUser !== -1) {
    res.json({
      message: "bienvenido :3"
    })
  }
  else{
    res.json({
      message: "algo salio mal :("
    })
  }
})

user.get('/', async (req, res) => {
  const body = req.body
  const newUser = await service.userList(body)
  res.json(newUser)
})

user.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const user = await service.update(parseInt(id), body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

user.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await service.userOne(parseInt(id))
    res.json(users)
  } catch (error) {
    next(error)
  }
})

user.delete('/:id', async (req, res) => {
  const { id } = req.params
  const user = await service.delete(parseInt(id))
  res.json(user)
})

module.exports = user
