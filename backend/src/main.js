import express from 'express'
const app = express()
import { dbConnection } from './dbConnection.js'


app.get("/api", (req, res) => {
    res.json({"backendData": [  "Das", "Kommt", "ausm", "Backend!"] })
})

dbConnection.connectToDB().then(r => { console.log("Connected to DB") })

//console.log(db)
app.listen(8085, () => { console.log("Server started on port 8085") })