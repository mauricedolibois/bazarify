import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const sellerRouter = express.Router()

sellerRouter.use(express.json())
sellerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

sellerRouter.get("/seller", (req, res) => {
    dbConnection.findProduct(req.query.operator, req.query.parameter).then(seller => {
        res.send(seller)
    })
}
)

sellerRouter.get("/allSellers", (req, res) => {
    dbConnection.findAllSellers().then(seller => {
        res.send(seller)
    })
}
)

sellerRouter.post("/seller", (req, res) => {
    dbConnection.insertSeller(req.body.seller_name,req.body.seller_firstname, req.body.seller_email, req.body.seller_phone).then
    (seller => { res.send(seller) })  
}
)

sellerRouter.delete("/seller", (req, res) => {
    dbConnection.deleteSeller(req.query.operator, req.query.parameter).then
    (seller => { res.send(seller) })  
    })

sellerRouter.put("/seller", (req, res) => {
    dbConnection.updateSeller(req.query.operator, req.query.parameter, req.body).then
    (seller => { res.send(seller) })
    })