const createUser = require('./modules/createUser')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/user', async (req, res) => {
  const user = await createUser()
  res.send({user})
})

app.get('/manyUsers/:amount', async (req, res) => {
  const {amount} = req.params

  const users = []
  for (let i = 0; i < amount; i++) {
    users.push(await createUser())
  }

  // Promise.all(users).then(data => {
  //   conso
  // })

  res.send({users})
})

app.listen(3500)
