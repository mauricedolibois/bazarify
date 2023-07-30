
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Info Schema for the database collection "info"
const InfoSchema = new Schema({
    bazar_name: {type: String, require: true, unique: true},
    bazar_year: {type: Number, require: true},
    bazar_commission: {type: Number, require: true},
    bazar_description: { type: String},
    bazar_tips: { type: Number, default: 0}
})
module.exports = mongoose.connection.model('info', InfoSchema)