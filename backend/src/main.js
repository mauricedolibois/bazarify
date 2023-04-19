import express from 'express'
const app = express()
import { dbConnection } from './DB/dbConnection.js'





dbConnection.connectToDB().then(r => { console.log("Fertig!") })

const doc = {"name": "Nordica Dobermann GSR", "price": 899 }
const result = dbConnection.insertOne("articles", doc)
console.log(`A document was inserted with the _id: ${result.insertedId}`);



app.get("/api", (req, res) => {
    // res.json({"backendData": [  "Das", "Kommt", "ausm", "Backend!"] })
    const getDoc = dbConnection.findOne("articles", {"_id": 1}).then(r => {
        res.json({"backendData": [  r.name, r.price] })
    })
})
app.listen(8085, () => { console.log("Server started on port 8085") })


