import { error } from "console"
import e from "express"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
import mongoose from 'mongoose'
const Product = require('./schemas/ProductSchema.cjs')
const Seller = require('./schemas/SellerSchema.cjs')
const Offer = require('./schemas/OfferSchema.cjs')
const Info = require('./schemas/InfoSchema.cjs')
const DbIdHandler = require('../services/UniqueIDs.cjs')
const InputValidation = require('../services/InputValidation.cjs')
var BazarName = "Bazarify"


// Connection to DB 
export const dbConnection = {
    async connectToDB() {
        const username = encodeURIComponent("maik");
        const password = encodeURIComponent("abc123");
        const clusterUrl = `127.0.0.1:27017/${BazarName}`;
        const uri = `mongodb://${username}:${password}@${clusterUrl}?authSource=admin`;
        await mongoose.connect(uri).then(console.log(`Connected to Database: ${BazarName}`)).catch(err => console.log(err))
    },
    async changeDB(newName) {
        BazarName = newName
        await this.close()
        await this.connectToDB()
        return "connected to " + BazarName
    },
    async newDB(newName, newYear, newCommission, newDescription) {
        try {
            newName = newName.replaceAll(" ", "_")
            // entry in Barazify Info
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            const validInfo = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
            const info = await Info.create(validInfo)
            await info.save().then(console.log(info) + "saved")
            await this.close()

            // entry in DB Info
            BazarName = newName
            await this.connectToDB()
            const validInfo2 = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
            const info2 = await Info.create(validInfo2)
            await info2.save().then(console.log(info))
            return info2

        }
        catch (error){ 
            console.log(error)
            return (error.message)
        }
    },
    async getBazars() {
        try {
            const currentDB = BazarName
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            const info = await Info.find().catch(err => console.log(err))
            await this.close()
            BazarName = currentDB
            await this.connectToDB()
            return info
        }
        catch { console.log("could not get Bazars") }
    },
    async getCurrentBazar() {
        return BazarName
    },
    async dropBazar(name) {
        try {
            const currentDB = BazarName
            await this.close()
            BazarName = name
            await this.connectToDB()
            await mongoose.connection.dropDatabase().then(console.log("DB dropped"))
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            await Info.deleteOne({ bazar_name: name }).then(console.log("Info deleted"))
            await this.close()
            BazarName = currentDB
            await this.connectToDB()
            return true
        } catch { console.log("could not drop DB") }
    },
    async close() {
        await mongoose.connection.close().then(console.log("DB closed"))
    },

    //TODO: ab hier in neue Klasse auslagern
    //CRUD Operations for Products, Sellers and Offers
    async insertProduct(name, price, category) {
        try {
            var id = DbIdHandler.generateProductId()
            const validProduct = await InputValidation.validateProduct(id, name, price, category)
            const product = await Product.create(validProduct)
            await product.save().then(console.log(product))
            return product
        }
        catch(error) { return (error.message) }
    },
    async insertSeller(name, firstname, email, phone) {
        try {
            const existingSeller = await this.checkDuplicateSeller(email)
            if (existingSeller != null) {
            console.log("Seller already exists: "+existingSeller)
            return existingSeller;
            }
            var id = DbIdHandler.generateSellerId()
            const validSeller = await InputValidation.validateSeller(id, firstname, name, email, phone)
            const seller = await Seller.create(validSeller)
            await seller.save().then(console.log(seller))
            return seller
        }
        catch(error) { return (error.message) }
    },
    async insertOffer(product_id, seller_id) {
        try {
            var id = DbIdHandler.generateOfferId()
            const validOffer = await InputValidation.validateOffer(id, product_id, seller_id)
            const offer = await Offer.create(validOffer)
            await offer.save().then(console.log(offer))
            return offer
        }
        catch(error) { return (error.message) }
    },
    async findProduct(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Product.findOne(filter);
    },
    async findSeller(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Seller.findOne(filter);
    },
    async findOffer(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Offer.findOne(filter);
    },
    async findAllProducts() {
        return await Product.find();
    },
    async findAllSellers() {
        return await Seller.find();
    },
    async findAllOffers() {
        return await Offer.find();
    },
    async checkDuplicateSeller(email) {
        const seller = {seller_email: email,}
        const duplicateSeller = await Seller.findOne(seller);    
        return duplicateSeller;
      },
    async updateProduct(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Product.findOneAndUpdate(filter, update).then(console.log("product updated"))
    },
    async updateSeller(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Seller.updateOne(filter, update).then(console.log("seller updated"))
    },
    async updateOffer(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Offer.updateOne(filter, update).then(console.log("offer updated"))
    },
    async deleteProduct(operator, parameter) {
        const filter = { [operator]: parameter }
        Product.deleteOne(filter).then(console.log("product deleted"))
    },
    async deleteSeller(operator, parameter) {
        const filter = { [operator]: parameter }
        Seller.deleteOne(filter).then(console.log("seller deleted"))
    },
    async deleteOffer(operator, parameter) {
        const filter = { [operator]: parameter }
        Offer.deleteOne(filter).then(console.log("offer deleted"))
    },
    async deleteAllProducts() {
        await Product.deleteMany().then(console.log("All products deleted"))
    },
    async deleteAllSellers() {
        await Seller.deleteMany().then(console.log("All sellers deleted"))
    },
    async deleteAllOffers() {
        await Offer.deleteMany().then(console.log("All offers deleted"))
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
                offer_id: offer.offer_id,
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
}
}