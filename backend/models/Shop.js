const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    cep: { type: String },
    numero: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    uf: { type: String },
    logo: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
