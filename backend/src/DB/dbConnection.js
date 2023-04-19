import { MongoClient } from 'mongodb'
import express from 'express'

export class dbConnection {

    static async connectToDB() {
        if(this.db == null){
            try {
                const username = encodeURIComponent("maik");
                const password = encodeURIComponent("abc123");
                const clusterUrl = "127.0.0.1:27017";
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

    static close() {
        console.log("Closing DB connection " + this.db.databaseName)
        return this.client.close();
    }

    static async insertOne(collectionName, document) {
        return await this.db.collection(String(collectionName)).insertOne(document)
    }

    static async findOne(collectionName, filter) {
        return await this.db.collection(collectionName).findOne(filter);
    }

    static async updateOne(collectionName, filter, update) {
        return await this.db.collection(collectionName).updateOne(filter, update);
    }

    static async deleteOne(collectionName, filter) {
        return await this.db.collection(collectionName).deleteOne(filter);
    }
}