class BoletoService {
    constructor () {
      const express = require('express');
      const mongoose = require('mongoose');
      require("../models/Boleto");
      this.Boleto = mongoose.model('boleto');
      const app = express();

      app.use(express.json());
      mongoose.connect('mongodb://localhost/BDBoleto', {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }).then(() => {
          console.log("Conexão com MongoDB realizada com sucesso!");
      }).catch((erro) => {
          console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
      });      
    }
  
    async get (param) {
      if(param.barCode && isNaN(param.barCode))
      {
        console.log(param.barCode);
        throw "Código de barras deve conter apenas numeros!";
      }
      return await this.Boleto.find(param).then((boleto) => {
        return boleto;
      }).catch((erro) => {        
      });
    }
  
    add (BoletoDTO) {
      if(!BoletoDTO.tipo || BoletoDTO.tipo == 0)
        throw "Tipo de boleto não informado!";
      if(!BoletoDTO.banco)
        throw "Banco do boleto não informado!";
      if(!BoletoDTO.agencia)
        throw "Agência do boleto não informada!";
      if(!BoletoDTO.valor || BoletoDTO.valor == 0)
        throw "Valor do boleto não informado!";
      expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      let barCode = this.format(BoletoDTO.banco,3) + "9";
      barCode += BoletoDTO.agencia + BoletoDTO.conta;
      let id = this.getNewId();
      barCode += id;
      barCode += this.format(BoletoDTO.valor,10);
      
      this.Boleto.create({
        id: id,
        typeDoc: BoletoDTO.tipo,
        barCode: barCode,
        amount: BoletoDTO.valor,
        expirationDate: expirationDate
      });
    }
    delete(){
      this.Boleto.delete();
    }
    format (p,count){
      let str = "";
      for(var i=0;i<count;i++)
        str += "0";
      return (str + p).slice(-count);
    }
    getNewId(){
      const lastBoleto = this.Boleto.find().sort({_id:1});
      if(lastBoleto.length == 0)
        return 1;
      else
        return lastBoleto[0].id + 1;
    }
  }
  
  module.exports = BoletoService