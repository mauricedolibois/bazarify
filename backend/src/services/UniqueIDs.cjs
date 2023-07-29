
const { customAlphabet } = require('nanoid')
const nanoidProduct = customAlphabet('1234567890', 10)
const nanoid = customAlphabet('1234567890', 5)

//module generates unique ids for db entries
module.exports = {
    generateProductId: function(){
         return nanoidProduct()
    },

    generateSellerId: function(){
        return nanoid()
    },

    generateOfferId: function(){
        return nanoid()
    }
}