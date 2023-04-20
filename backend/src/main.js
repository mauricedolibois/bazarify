import express from 'express'
const app = express()
import { ProductManager } from './manager/ProductManager.js'

ProductManager.connectToDB()
//ProductManager.addProduct("Test", 123)

// Hier muss ich noch die Daten aus der DB holen
app.get("/api", (req, res) => {
    ProductManager.getProductById("1").then(product => {
    console.log(product)
    res.json({"backendData": [product.name, product.price] })
})
})

app.listen(8085, () => { console.log("Server started on port 8085") })


