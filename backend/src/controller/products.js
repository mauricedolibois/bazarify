import express from 'express'
import cors from'cors'
import { productDAO } from '../database/operations/ProductDAO.js';
import { offerDAO } from '../database/operations/OfferDAO.js';
export const productRouter = express.Router()

//security stuff
productRouter.use(express.json())
productRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

//route to get product by an operator and a parameter
productRouter.get("/product", (req, res) => {
    productDAO.findProduct(req.query.operator, req.query.parameter).then(product => {
        res.send(product)
    })
}
)

//route to get all products
productRouter.get("/allProducts", (req, res) => {
    productDAO.findAllProducts().then(product => {
        res.send(product)
    })
}
)

//route to create a new product entry; needs name, price and category
productRouter.post("/product", (req, res) => {
    productDAO.insertProduct(req.body.product_name, req.body.product_price, req.body.product_category).then
    (product => { res.send(product) })  
    })  

//route to delete a product entry; needs an operator and a parameter
productRouter.delete("/product", (req, res) => {
    productDAO.deleteProduct(req.query.operator, req.query.parameter).then
    (product => { res.send(product) })  
    })

//route to update a product entry; needs an operator and a parameter and the new values
productRouter.put("/product", (req, res) => {
    productDAO.updateProduct(req.query.operator, req.query.parameter, req.body).then
    (product => { res.send(product) })
    })


//route to set specific offer stete to reclined (is in offerDAO but is called from product page)
productRouter.put("/product-recline", (req, res) => {
    console.log("recline")
    offerDAO.updateOffer('product_id', req.query.id, {state: 'reclined'}).then
    (product => { res.send(product) })
    })


