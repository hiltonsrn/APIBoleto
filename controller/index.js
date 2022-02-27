const express = require('express')

const boletoRouter = require('./BoletoController')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('App online!')
})

router.use('/boleto', boletoRouter)

module.exports = router