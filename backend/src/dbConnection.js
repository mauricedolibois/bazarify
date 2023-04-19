import { MongoClient } from 'mongodb'
import express from 'express'

export class dbConnection {


    static async connectToDB() {
        try {
        let db = null
        const username = encodeURIComponent("maik");
        const password = encodeURIComponent("abc123");
        const clusterUrl = "127.0.0.1:27017";
        const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        db = client.db('Bazarify')
        await client.connect()
        console.log("Connected to DB")
        } catch (error) {
            console.log(error)
        }
    }
    }


/*
export function connectToDB() {
    const uri = `mongodb://${username}:${password}@${clusterUrl}/?authMechanism=DEFAULT`;
    const client = new MongoClient(uri);
    db = client.db('Bazarify')

    const myColl = db.collection("articels")
    const doc = { articel: "Nordica Dobermann GSR", price: 899 }
    const result = myColl.insertOne(doc)
}*/
