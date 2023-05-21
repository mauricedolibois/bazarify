
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InfoSchema = new Schema({
    bazar_id: {type: Number, require: true, unique: true},
    bazar_name: {type: String, require: true},
    bazar_year: {type: Number, require: true},
    bazar_commission: {type: Number, require: true},
    bazar_description: { type: String, required: true }
})
module.exports = mongoose.connection.model('info', InfoSchema)