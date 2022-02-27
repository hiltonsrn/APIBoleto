const express = require('express');
const routers = require('./controller')
const app = express()

app.use(express.json())
app.use('/', routers)


app.listen(3000, () => {
  console.log('App online!')
})