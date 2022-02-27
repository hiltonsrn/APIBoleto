const express = require('express')
const router = express.Router()
const boleto = require('../models/Boleto')
const BoletoService = require('../services/BoletoService')

const boletoService = new BoletoService(boleto)

router.get('/',  async (req, res) => {
  try{
    const boletos = await boletoService.get({});
    res.status(200).json(boletos);
  }catch(err)
  {
    res.status(400).json(err);
  }
})

router.get('/:barCode',  async (req, res) => {
  try{
      const boletos = await boletoService.get({barCode:req.params.barCode });      
      res.status(200).json(boletos);
  }catch(err)
  {
    res.status(400).json(err);
  }
})

router.get('/:tipo/:banco/:agencia/:valor',  async (req, res) => {
  try{
      await boletoService.add({
        tipo:req.params.tipo,
        banco:req.params.banco,
        agencia:req.params.agencia,
        valor:req.params.valor
       });      
      res.status(200).json("Boleto gerado com sucesso!");
  }catch(err)
  {
    res.status(400).json(err);
  }
})

module.exports = router