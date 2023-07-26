import express from 'express'
import cors from'cors'
import { productDAO } from '../database/operations/ProductDAO.js';
import { offerDAO } from '../database/operations/OfferDAO.js';
export const productRouter = express.Router()
var pendingProducts = []

productRouter.use(express.json())
productRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

productRouter.get("/product", (req, res) => {
    productDAO.findProduct(req.query.operator, req.query.parameter).then(product => {
        res.send(product)
    })
}
)


productRouter.get("/allProducts", (req, res) => {
    productDAO.findAllProducts().then(product => {
        res.send(product)
    })
}
)


productRouter.post("/product", (req, res) => {
    productDAO.insertProduct(req.body.product_name, req.body.product_price, req.body.product_category).then
    (product => { res.send(product) })  
    })

productRouter.post('/addPendingProduct', (req, res) => {
    const product = req.body;
          
    pendingProducts.push(product);
          
    res.send(pendingProducts);
})

productRouter.put("/DeletePendingProduct", (req, res) => {
    pendingProducts = [];
    res.send(pendingProducts);
})    
     
productRouter.delete("/product", (req, res) => {
    productDAO.deleteProduct(req.query.operator, req.query.parameter).then
    (product => { res.send(product) })  
    })


productRouter.put("/product", (req, res) => {
    productDAO.updateProduct(req.query.operator, req.query.parameter, req.body).then
    (product => { res.send(product) })
    })



productRouter.put("/product-recline", (req, res) => {
    console.log("recline")
    offerDAO.updateOffer('product_id', req.query.id, {state: 'reclined'}).then
    (product => { res.send(product) })
    })


