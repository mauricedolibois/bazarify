
module.exports = {
    generateProductId: function(){
         return Math.floor(Math.random()*1000000);
    },

    generateCustomerId: function(){
        return Math.floor(Math.random()*10000);
    },

    generateSaleId: function(){
        return Math.floor(Math.random()*10000);
    }
}
