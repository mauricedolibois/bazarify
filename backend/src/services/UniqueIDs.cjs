
const { customAlphabet } = require('nanoid')
const nanoidProduct = customAlphabet('1234567890', 10)
const nanoid = customAlphabet('1234567890', 5)

module.exports = {
    generateProductId: function(){
         return nanoidProduct()
    },

    generateCustomerId: function(){
        return nanoid()
    },

    generateSaleId: function(){
        return nanoid()
    },
}
//package cuid