
const { customAlphabet } = require('nanoid')
const nanoidLong = customAlphabet('1234567890', 10)
const nanoid = customAlphabet('1234567890', 5)

module.exports = {
    generateProductId: function(){
         return nanoidLong()
    },

    generateSellerId: function(){
        return nanoid()
    },

    generateOfferId: function(){
        return nanoidLong()
    }
}
//package cuid