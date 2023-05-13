import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const productRouter = express.Router()

productRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

productRouter.get("/product", (req, res) => {
    dbConnection.findProduct(req.query.operator, req.query.parameter).then(product => {
        res.send(product)
        console.log(product)
    })
}
)

productRouter.get("/allProducts", (req, res) => {
    dbConnection.findAllProducts().then(product => {
        res.send(product)
    })
}
)

// productRouter.post("/product", (req, res) => {
//     dbConnection.insertProduct(req.query.name, req.query.price).then
//     (product => { res.send(product) })  
//     })


