import express from 'express'
const app = express()
import { ProductManager } from './manager/ProductManager.js'

ProductManager.connectToDB()
//Insert into DB
ProductManager.addProduct(5,"Samu", 420)

//Get from DB
app.get("/api", (req, res) => {
    ProductManager.getProductById(5).then(product => {
    res.json({"backendData": [product.name, product.price] })
})
})

app.listen(8085, () => { console.log("Server started on port 8085") })


