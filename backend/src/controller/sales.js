import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const saleRouter = express.Router()

saleRouter.use(express.json())
saleRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

saleRouter.get("/sale", (req, res) => {
    dbConnection.findProduct(req.query.operator, req.query.parameter).then(sale => {
        res.send(sale)
    })
}
)

saleRouter.get("/allSales", (req, res) => {
    dbConnection.findAllProducts().then(sale => {
        res.send(sale)
    })
}
)

saleRouter.post("/sale", (req, res) => {
    dbConnection.insertSale(req.body.product_id, req.body.customer_id).then
    (sale => { res.send(sale) })  
}
)

saleRouter.delete("/sale", (req, res) => {
    dbConnection.deleteSale(req.query.operator, req.query.parameter).then
    (sale => { res.send(sale) })  
    }
)

saleRouter.put("/sale", (req, res) => {
    dbConnection.updateSale(req.query.operator, req.query.parameter, req.body).then
    (sale => { res.send(sale) })
    }
)
