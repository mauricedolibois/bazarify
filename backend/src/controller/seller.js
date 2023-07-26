import express from 'express'
import cors from'cors'
import { sellerDAO } from '../database/operations/SellerDAO.js';
export const sellerRouter = express.Router()

sellerRouter.use(express.json())
sellerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

sellerRouter.get("/seller", (req, res) => {
    sellerDAO.findSeller(req.query.operator, req.query.parameter).then(seller => {
        res.send(seller)
    })
}
)


sellerRouter.get("/sellerProducts", (req, res) => {
    sellerDAO.getSellersProducts(req.query.seller_id).then(products => {
        res.send(products)
    })
}
)

sellerRouter.get("/allSellers", (req, res) => {
    sellerDAO.findAllSellers().then(seller => {
        res.send(seller)
    })
}
)

sellerRouter.post("/seller", (req, res) => {
    sellerDAO.insertSeller(req.body.seller_name,req.body.seller_firstname, req.body.seller_email, req.body.seller_phone).then
    (seller => { res.send(seller) })  
}
)

sellerRouter.delete("/seller", (req, res) => {
    sellerDAO.deleteSeller(req.query.operator, req.query.parameter).then
    (seller => { res.send(seller) })  
    })

sellerRouter.put("/seller", (req, res) => {
    sellerDAO.updateSeller(req.query.operator, req.query.parameter, req.body).then
    (seller => { res.send(seller) })
    })