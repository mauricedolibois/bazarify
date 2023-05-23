import { error } from "console"
import e from "express"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
import mongoose from 'mongoose'
const Product = require('./schemas/ProductSchema.cjs')
const Customer = require('./schemas/CustomerSchema.cjs')
const Sale = require('./schemas/SaleSchema.cjs')
const BazarInfo = require('./schemas/InfoSchema.cjs')
const DbIdHandler = require('../services/UniqueIDs.cjs')
const InputValidation = require('../services/InputValidation.cjs')
var BazarName = "Bazarify"


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
    },
    //Prüfen ob DB existiert
    async newDB(newName, newYear, newCommission, newDescription) {
        try{
        BazarName = newName
        await this.close()
        await this.connectToDB()
        const validInfo = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
        const info = await BazarInfo.create(validInfo)
        await info.save().then(console.log(info))
        return info
            }
        catch{console.log("could not create new DB")}
    },
    async close() {
        await mongoose.connection.close().then(console.log("DB closed"))
    },
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
    async insertSale(product_id, customer_id) {
        try{
            var id = DbIdHandler.generateProductId()
            const validSale = await InputValidation.validateSale(id, product_id, customer_id)
            const sale = await Sale.create(validSale)
            await sale.save().then(console.log(sale))
            return sale
        }
        catch{console.log("could not insert sale")}
    },
    async findProduct(operator, parameter) {
        const filter = {[operator]: parameter}
        console.log({filter})
        return await Product.findOne(filter);
    },
    async findCustomer(operator, parameter) {
        const filter = {[operator]: parameter}
        return await Customer.findOne(filter);
    },
    async findSale(operator, parameter) {
        const filter = {[operator]: parameter}
        return await Sale.findOne(filter);
    },
    async findAllProducts() {
        return await Product.find();
    },
    async findAllCustomers() {
        return await Customer.find();
    },
    async findAllSales() {
        return await Sale.find();
    },
    async updateProduct(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Product.findOneAndUpdate(filter, update).then(console.log("product updated"))
    },
    async updateCustomer(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Customer.updateOne(filter, update).then(console.log("customer updated"))
    },
    async updateSale(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Sale.updateOne(filter, update).then(console.log("sale updated"))
    },
    async deleteProduct(operator, parameter) {
        const filter = {[operator]: parameter}
        Product.deleteOne(filter).then(console.log("product deleted"))
    },
    async deleteCustomer(operator, parameter) {
        const filter = {[operator]: parameter}
        Customer.deleteOne(filter).then(console.log("customer deleted"))
    },
    async deleteSale(operator, parameter) {
        const filter = {[operator]: parameter}
        Sale.deleteOne(filter).then(console.log("sale deleted"))
    },
    async deleteAllProducts() {
        await Product.deleteMany().then(console.log("All products deleted"))
    },
    async deleteAllCustomers() {
        await Customer.deleteMany().then(console.log("All customers deleted"))
    },
    async deleteAllSales() {
        await Sale.deleteMany().then(console.log("All sales deleted"))
    }
}

//validierung