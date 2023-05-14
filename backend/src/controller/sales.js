import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const saleRouter = express.Router()

saleRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

saleRouter.get("/product", (req, res) => {
    dbConnection.findProduct(req.query.operator, req.query.parameter).then(sale => {
        res.send(sale)
    })
}
)

saleRouter.get("/allProducts", (req, res) => {
    dbConnection.findAllProducts().then(sale => {
        res.send(sale)
    })
}
)