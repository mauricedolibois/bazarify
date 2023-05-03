import express from 'express'
const app = express()
import { ProductManager } from './manager/ProductManager.js'

let pmanager= new ProductManager();

//Connect to DB
pmanager.connectToDB()

//Insert into DB
//pmanager.addProduct(5,"Samu", 420)

//Get all from DB
/* pmanager.getAllProducts().then(product => {
    console.log(product)
}) */

//Update DB
//pmanager.updateProduct(5,"Samu", 69)


//Get from DB
app.get("/api", (req, res) => {
    pmanager.getProductByName("Samu").then(product => {
        console.log(product)
    res.json({"backendData":[product.name, product.price] })
})
})

app.listen(8085, () => { console.log("Server started on port 8085") })


