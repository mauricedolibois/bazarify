const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleSchema = new Schema({
    order_id: {type: Number, require: true, unique: true},
    product_id: {type: Schema.Types.Number, ref: 'product'},
    customer_id: {type: Schema.Types.Number, ref: 'customer'},
    soldAt: { type: Date, default: Date.now }
})
module.exports = mongoose.connection.model('sale', SaleSchema)
