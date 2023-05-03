import express from 'express'
const app = express()
import { ProductManager } from './manager/ProductManager.js'

let pmanager= new ProductManager();

//Connect to DB
pmanager.connectToDB()

//Insert into DB
pmanager.addProduct(1,"Ski", 69, "Müller", "Max", "Musterweg 1, 12345 Musterstadt", "max.müller@gmail.com", "01752 86753 37869" )

//Get all from DB
/* pmanager.getAllProducts().then(product => {
    console.log(product)
}) */

//Update DB
//pmanager.updateProduct(1,"Samu", 69)

//Update all from DB
//pmanager.updateAllProducts("Samu", 69)

//Delete from DB
//pmanager.deleteProduct(1)


//Delete all from DB
//pmanager.deleteAllProducts()

//Get from DB
app.get("/api", (req, res) => {
    pmanager.getProductByName("Samu").then(product => {
        console.log(product)
    res.json({"backendData":[product.name, product.price] })
})
})

app.listen(8085, () => { console.log("Server started on port 8085") })


