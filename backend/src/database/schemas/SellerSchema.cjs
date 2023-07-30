const DbIdHandler = require('../../services/UniqueIDs.cjs')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Seller Schema for the database collection "seller"
const SellerSchema = new Schema({
    seller_id: {type: Number, require: true, unique: true},
    seller_name: {type: String, require: true},
    seller_firstname: {type: String, require: true},
    seller_email: {type: String, require: true, unique: true},
    seller_phone: { type: String, required: true }
})
module.exports = mongoose.connection.model('seller', SellerSchema)