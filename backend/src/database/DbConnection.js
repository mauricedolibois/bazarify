import { MongoClient } from 'mongodb'
import express from 'express'

export class dbConnection {

    async connectToDB() {
        if(this.db == null){
            try {
                const username = encodeURIComponent("maik");
                const password = encodeURIComponent("abc123");
                const clusterUrl = "mongo:27017";
                const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=DEFAULT`;
                this.client = new MongoClient(uri);
                this.db = this.client.db('Bazarify')
                await this.client.connect()
                console.log("Connected to DB")
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

    async insertOne(collectionName, document) {
        return await this.db.collection(String(collectionName)).insertOne(document)
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