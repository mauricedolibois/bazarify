import express, { urlencoded } from 'express'
const app = express()
import { ProductManager } from './manager/ProductManager.js'

ProductManager.connectToDB()
//Insert into DB
//ProductManager.addProduct(5,"Samu", 420)

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use((req, res, next) => {
    res.header("Access-Allow-Origin", "http://localhost") //allow localhost for api
})


//Get from DB
app.get("/api", (req, res) => {
    ProductManager.getProductById(5).then(product => {
    res.json({"backendData": [product.name, product.price] })
})
})

// Add new product to DB
app.post("/api/add-product", (req, res) => {
    console.log(req.body)
    const { id, name, price } = req.body;
    ProductManager.addProduct(id, name, price)
      .then(() => res.status(200).json({ message: 'Product added successfully' }))
      .catch(error => res.status(500).json({ message: 'Failed to add product', error }));
})

app.listen(8085, () => { console.log("Server started on port 8085") })


