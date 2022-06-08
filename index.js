const routerApi = require('./routes/index')
const express = require('express')

const port = 3000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hola mi server express :)')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola, soy una nueva ruta porque si')
})

routerApi(app)

app.listen(port, () => {
  console.log('mi port' + port)
})
