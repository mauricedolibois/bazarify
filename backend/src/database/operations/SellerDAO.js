import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Product = require('../schemas/ProductSchema.cjs')
const Seller = require('../schemas/SellerSchema.cjs')
const Offer = require('../schemas/OfferSchema.cjs')
const DbIdHandler = require('../../services/UniqueIDs.cjs')
const InputValidation = require('../../services/InputValidation.cjs')

export const sellerDAO = {
async insertSeller(name, firstname, email, phone) {
    try {
        const existingSeller = await this.checkDuplicateSeller(email)
        if (existingSeller != null) {
        return existingSeller;
        }
        var id = DbIdHandler.generateSellerId()
        const validSeller = await InputValidation.validateSeller(id, firstname, name, email, phone)
        const seller = await Seller.create(validSeller)
        await seller.save()
        return seller
    }
    catch(error) { return (error.message) }
},
async findSeller(operator, parameter) {
    const filter = { [operator]: parameter }
    return await Seller.findOne(filter);
},
async findAllSellers() {
    return await Seller.find();
},
async checkDuplicateSeller(email) {
    const seller = {seller_email: email,}
    const duplicateSeller = await Seller.findOne(seller);    
    return duplicateSeller;
  },
  async updateSeller(operator, parameter, update) {
    const filter = { [operator]: parameter }
    Seller.updateOne(filter, update).then(console.log("seller updated"))
},
async deleteSeller(operator, parameter) {
    const filter = { [operator]: parameter }
    Seller.deleteOne(filter).then(console.log("seller deleted"))
},
async deleteAllSellers() {
    await Seller.deleteMany().then(console.log("All sellers deleted"))
},
async getSellersProducts(seller_id) {
    try {
    const offers = await Offer.find({ seller_id: seller_id })
    const products = await Product.find();
    var sellersProducts = []
    for (var i = 0; i < offers.length; i++) {
        var offer = offers[i]
        var product = products.find(product => product.product_id == offer.product_id)
        var offer = {
            product_id: product.product_id,
            offer_status: offer.state,
            product_name: product.product_name,
            product_price: product.product_price,
            product_category: product.product_category,
        }
        sellersProducts.push(offer)
    }
    return sellersProducts
}
catch { console.log("could not get sellers products") }
},
}