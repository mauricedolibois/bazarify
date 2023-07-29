import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Product = require('../schemas/ProductSchema.cjs')
const Seller = require('../schemas/SellerSchema.cjs')
const Offer = require('../schemas/OfferSchema.cjs')
const DbIdHandler = require('../../services/UniqueIDs.cjs')
const InputValidation = require('../../services/InputValidation.cjs')

// Product Data Access Object
export const sellerDAO = {
// insert a new seller into the database and return it (needs to be validated first); Input are name, firstname, email and phone
async insertSeller(name, firstname, email, phone) {
    try {
        //checks if seller already exists
        const existingSeller = await this.checkDuplicateSeller(email)
        if (existingSeller != null) {
        // if seller already exists, return the existing seller and do not create a new one
        return existingSeller;
        }
        // generate a unique id for the seller
        var id = DbIdHandler.generateSellerId()
        // validate the input
        const validSeller = await InputValidation.validateSeller(id, firstname, name, email, phone)
        // insert the seller into the database
        const seller = await Seller.create(validSeller)
        await seller.save()
        return seller
    }
    catch(error) { return (error.message) }
},
// find a seller in the database by a given operator and parameter and return it
async findSeller(operator, parameter) {
    const filter = { [operator]: parameter }
    return await Seller.findOne(filter);
},
// find all sellers in the database and return them
async findAllSellers() {
    return await Seller.find();
},
//check if seller already exists in db with the mail as unique identifier
async checkDuplicateSeller(email) {
    const seller = {seller_email: email,}
    const duplicateSeller = await Seller.findOne(seller);    
    return duplicateSeller;
  },
// update a seller in the database by a given operator and parameter and new values
async updateSeller(operator, parameter, update) {
    const filter = { [operator]: parameter }
    Seller.updateOne(filter, update).then(console.log("seller updated"))
},
// delete a seller in the database by a given operator and parameter
async deleteSeller(operator, parameter) {
    const filter = { [operator]: parameter }
    Seller.deleteOne(filter).then(console.log("seller deleted"))
},
// delete all sellers in the database
async deleteAllSellers() {
    await Seller.deleteMany().then(console.log("All sellers deleted"))
},
// get all products of a seller and return an array of products with the product_id, product_name, product_price, product_category and offer_status
async getSellersProducts(seller_id) {
    try {
    //get all offers of a seller and all products in db
    const offers = await Offer.find({ seller_id: seller_id })
    const products = await Product.find();
    var sellersProducts = []
    //for each offer, get the product and add it to the array
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