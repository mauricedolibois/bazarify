import { MongoClient } from 'mongodb'
import { createRequire } from "module"
const require = createRequire(import.meta.url)
import express from 'express'
import mongoose from 'mongoose'
const Product = require('./schemas/ProductSchema.cjs')
const Customer = require('./schemas/CustomerSchema.cjs')
const Sale = require('./schemas/SaleSchema.cjs')

export class dbConnection {

    async connectToDB() {
        if(this.db == null){
            try {
                const username = encodeURIComponent("maik");
                const password = encodeURIComponent("abc123");
                const clusterUrl = "localhost:27017";
                const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=DEFAULT`;
                await mongoose.connect(uri).then(console.log("Connected to DB")).then(this.db = mongoose.connection).then(this.insertOne())
            } catch (error) {
                console.log(error)
            }
        }
        else{
            console.log("DB already connected")
        }
    }

    async close() {
        console.log("Closing DB connection " + this.db.databaseName)
        return this.client.close();
    }

    async insertOne() {
        const product = await Product.create({product_price: 12, product_name : "Ski"})
        await product.save().then(console.log(product))
        
       // return await this.db.collection(String(collectionName)).insertOne(document)
        
    }

    async findOne(collectionName, filter) {
        return await this.db.collection(collectionName).findOne(filter);
    }

    async findAll(collectionName) {
        return await this.db.collection(collectionName).find().toArray();
    }

    async updateOne(collectionName, filter, update) {
        return await this.db.collection(collectionName).updateOne(filter, update);
    }

    async updateMany(collectionName, filter, update) {
        return await this.db.collection(collectionName).updateMany(filter, update);
    }

    async deleteOne(collectionName, filter) {
        return await this.db.collection(collectionName).deleteOne(filter);
    }

    async deleteMany(collectionName, filter) {
        return await this.db.collection(collectionName).deleteMany(filter);
    }

    async exists(collectionName, filter) {
        return await this.db.collection(collectionName).findOne(filter) != null
    }
}