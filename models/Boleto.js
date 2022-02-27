const mongoose = require('mongoose');

const Boleto = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    typeDoc: {
        type: Number,
        required: true
    },
    barCode: {
        type: String,
        required: true
    },    
    amount: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('boleto', Boleto);