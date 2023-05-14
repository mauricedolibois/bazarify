import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const customerRouter = express.Router()

customerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

customerRouter.get("/customer", (req, res) => {
    dbConnection.findProduct(req.query.operator, req.query.parameter).then(customer => {
        res.send(customer)
    })
}
)

customerRouter.get("/allProducts", (req, res) => {
    dbConnection.findAllProducts().then(customer => {
        res.send(customer)
    })
}
)