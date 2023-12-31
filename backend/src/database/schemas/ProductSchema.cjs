const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Product Schema for the database collection "product"
const ProductSchema = new Schema({
    product_id: {type: Number, require: true, unique: true},
    product_name: {type: String, require: true},
    product_price: { type: Number, required: true },
    product_category: { type: String, required: true }
})
module.exports = mongoose.connection.model('product', ProductSchema)