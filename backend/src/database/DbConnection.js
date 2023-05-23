import { error } from "console"
import e from "express"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
import mongoose from 'mongoose'
const Product = require('./schemas/ProductSchema.cjs')
const Customer = require('./schemas/CustomerSchema.cjs')
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
        return "connected to "+ BazarName
    },
    async newDB(newName, newYear, newCommission, newDescription) {
        try{
        // entry in Barazify Info
        await this.close()    
        BazarName="Bazarify"
        await this.connectToDB()
        const validInfo = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
        const info = await Info.create(validInfo).catch(err => console.log(err))
        await info.save().then(console.log(info) +"saved")
        await this.close()

        // entry in DB Info
        BazarName = newName
        await this.connectToDB()
        const validInfo2 = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
        const info2 = await Info.create(validInfo2)
        await info2.save().then(console.log(info))
        return info2

            }
        catch{console.log("could not create new DB")}
    },
    async getBazars() {
        try{
        const currentDB = BazarName
        await this.close()
        BazarName = "Bazarify"
        await this.connectToDB()
        const info = await Info.find().catch(err => console.log(err))
        await this.close()
        BazarName = currentDB
        await this.connectToDB()
        console.log(info)
        return info
        }
        catch{console.log("could not get Bazars")}
    },
    async getCurrentBazar() {
        return BazarName
    },
    async dropBazar(name) {
        try{
       const currentDB = BazarName
         await this.close()
            BazarName = name
            await this.connectToDB()
            await mongoose.connection.dropDatabase().then(console.log("DB dropped"))
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            await Info.deleteOne({bazar_name: name}).then(console.log("Info deleted"))
            await this.close()
            BazarName = currentDB
            await this.connectToDB()
            return true
        } catch{console.log("could not drop DB")}
    },
    async close() {
        await mongoose.connection.close().then(console.log("DB closed"))
    },


    //CRUD Operations for Products, Customers and Offers
    async insertProduct(name, price, category) {
        try{
            var id = DbIdHandler.generateProductId()
            const validProduct = await InputValidation.validateProduct(id, name, price, category)
            const product = await Product.create(validProduct)
            await product.save().then(console.log(product))
            return product
        }
        catch{console.log("could not insert product")}
    },
    async insertCustomer(name, firstname, email, phone) {
        try{
            var id = DbIdHandler.generateCustomerId()
            const validCustomer = await InputValidation.validateCustomer(id, firstname, name, email, phone)
            const customer = await Customer.create(validCustomer)
            await customer.save().then(console.log(customer))
            return customer
        }
        catch{console.log("could not insert customer")
}
    },
    async insertOffer(product_id, customer_id) {
        try{
            var id = DbIdHandler.generateOfferId()
            const validOffer = await InputValidation.validateOffer(id, product_id, customer_id)
            const offer = await Offer.create(validOffer)
            await offer.save().then(console.log(offer))
            return offer
        }
        catch{console.log("could not insert offer")}
    },
    async findProduct(operator, parameter) {
        const filter = {[operator]: parameter}
        return await Product.findOne(filter);
    },
    async findCustomer(operator, parameter) {
        const filter = {[operator]: parameter}
        return await Customer.findOne(filter);
    },
    async findOffer(operator, parameter) {
        const filter = {[operator]: parameter}
        return await Offer.findOne(filter);
    },
    async findAllProducts() {
        return await Product.find();
    },
    async findAllCustomers() {
        return await Customer.find();
    },
    async findAllOffers() {
        return await Offer.find();
    },
    async updateProduct(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Product.findOneAndUpdate(filter, update).then(console.log("product updated"))
    },
    async updateCustomer(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Customer.updateOne(filter, update).then(console.log("customer updated"))
    },
    async updateOffer(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Offer.updateOne(filter, update).then(console.log("offer updated"))
    },
    async deleteProduct(operator, parameter) {
        const filter = {[operator]: parameter}
        Product.deleteOne(filter).then(console.log("product deleted"))
    },
    async deleteCustomer(operator, parameter) {
        const filter = {[operator]: parameter}
        Customer.deleteOne(filter).then(console.log("customer deleted"))
    },
    async deleteOffer(operator, parameter) {
        const filter = {[operator]: parameter}
        Offer.deleteOne(filter).then(console.log("offer deleted"))
    },
    async deleteAllProducts() {
        await Product.deleteMany().then(console.log("All products deleted"))
    },
    async deleteAllCustomers() {
        await Customer.deleteMany().then(console.log("All customers deleted"))
    },
    async deleteAllOffers() {
        await Offer.deleteMany().then(console.log("All offers deleted"))
    }
}