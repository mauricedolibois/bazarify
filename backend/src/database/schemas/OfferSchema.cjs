const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Offer Schema for the database collection "offer"
const OfferSchema = new Schema({
    offer_id: {type: Number, require: true, unique: true},
    product_id: {type: Schema.Types.Number, ref: 'product'},
    seller_id: {type: Schema.Types.Number, ref: 'seller'},
    state: { type: String, enum: ['open', 'sold', 'reclined'], default: 'open' },
    updatedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.connection.model('offer', OfferSchema)
