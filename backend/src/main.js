import express from 'express'
const app = express()
import { ProductManager } from './manager/ProductManager.js'

ProductManager.connectToDB()
//Insert into DB
//ProductManager.addProduct(2,"Tom", 187)

//Get from DB
app.get("/api", (req, res) => {
    ProductManager.getProductById(2).then(product => {
    console.log("produkt:"+product)
    res.json({"backendData": [product.name, product.price] })
})
})

app.listen(8085, () => { console.log("Server started on port 8085") })


