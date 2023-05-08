import express, { urlencoded } from 'express'
import cors from'cors'
const app = express()
import { ProductManager } from './manager/ProductManager.js'



app.use(express.json())
app.use(urlencoded({extended:true}))

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));

let pmanager= new ProductManager();

//Connect to DB
pmanager.connectToDB()

//Insert into DB
app.post("/api/add-product", (req, res) => {
    console.log(req.body)
    pmanager.addProduct(req.body.id, req.body.name, req.body.price, "Müller", "Max", "Musterweg 1" , "12345 Musterstadt", "max.müller@gmail.com", "01752 86753 37869")
    
})

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
    pmanager.getProductById("2").then(product => {
        console.log(product)
    res.json({"backendData":[product.id, product.name, product.price] })
})
})

//Get all from DB
app.get("/api/all", (req, res) => {
    pmanager.getAllProducts().then(product => {
        console.log(product)
    res.json({"backendData":product })
})
})

app.listen(8085, () => { console.log("Server started on port 8085") })


