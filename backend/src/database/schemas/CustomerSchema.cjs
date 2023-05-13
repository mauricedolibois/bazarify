const DbIdHandler = require('../DbIdHandler.cjs')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    customer_id: {type: Number, require: true, unique: true},
    customer_name: {type: String, require: true},
    customer_firstname: {type: String, require: true},
    customer_email: {type: String, require: true},
    customer_phone: { type: Number, required: true }
})
module.exports = mongoose.model('customer', CustomerSchema)