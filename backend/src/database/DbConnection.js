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
        try{
            const product = await Product.create({product_id: id, product_name : name, product_price: price})
            await product.save().then(console.log(product))
        }
        catch{console.log("product already exists")}
    },
    async insertCustomer(id, name, firstname, email, phone) {
        try{
            const customer = await Customer.create({customer_id: id, customer_name : name, customer_firstname: firstname, customer_email: email, customer_phone: phone})
            await customer.save().then(console.log(customer))
        }
        catch{console.log("customer already exists")}
    },
    async insertSale(id, product_id, customer_id) {
        try{
        const sale = await Sale.create({order_id: id, product_id : product_id, customer_id: customer_id})
        await sale.save().then(console.log(sale))
        }
        catch{console.log("sale already exists")}
    },
    async findProduct(operator, parameter) {
        const filter = {[operator]: parameter}
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
        Product.updateOne(filter, update).then(console.log("product updated"))
    },
    async updateCustomer(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Customer.updateOne(filter, update).then(console.log("customer updated"))
    },
    async updateSale(operator, parameter, update) {
        const filter = {[operator]: parameter}
        Sale.updateOne(filter, update).then(console.log("sale updated"))
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