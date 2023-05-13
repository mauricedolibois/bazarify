import { MongoClient } from 'mongodb'
import { createRequire } from "module"
const require = createRequire(import.meta.url)
import express from 'express'
import mongoose from 'mongoose'
const Product = require('./schemas/ProductSchema.cjs')
const Customer = require('./schemas/CustomerSchema.cjs')
const Sale = require('./schemas/SaleSchema.cjs')


  export const dbConnection = {
    async connectToDB() {
        const username = encodeURIComponent("maik");
        const password = encodeURIComponent("abc123");
        const clusterUrl = "127.0.0.1:27017";
        const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=DEFAULT`;
        await mongoose.connect(uri).then(console.log("DB connected")).catch(err => console.log(err))
  },
    async close() { 
        await mongoose.connection.close().then(console.log("DB closed"))
    },
    async insertProduct(id, name, price) {
        const product = await Product.create({product_id: id, product_name : name, product_price: price})
        await product.save().then(console.log(product))
    },
    async insertCustomer(id, name, firstname, email, phone) {
        const customer = await Customer.create({customer_id: id, customer_name : name, customer_firstname: firstname, customer_email: email, customer_phone: phone})
        await customer.save().then(console.log(customer))
    },
    async insertSale(id, product_id, customer_id) {
        const sale = await Sale.create({order_id: id, product_id : product_id, customer_id: customer_id})
        await sale.save().then(console.log(sale))
    },
    async findProduct(operator, parameter) {
        const filter = {[operator]: parameter}
        return await Product.find(filter);
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