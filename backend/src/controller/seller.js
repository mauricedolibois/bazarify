import express from 'express'
import cors from'cors'
import { sellerDAO } from '../database/operations/SellerDAO.js';
export const sellerRouter = express.Router()

//security stuff
sellerRouter.use(express.json())
sellerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

//route to get seller by an operator and a parameter
sellerRouter.get("/seller", (req, res) => {
    sellerDAO.findSeller(req.query.operator, req.query.parameter).then(seller => {
        res.send(seller)
    })
}
)

//route to get all products from a seller, needs seller_id
sellerRouter.get("/sellerProducts", (req, res) => {
    sellerDAO.getSellersProducts(req.query.seller_id).then(products => {
        res.send(products)
    })
}
)

//route to get all sellers
sellerRouter.get("/allSellers", (req, res) => {
    sellerDAO.findAllSellers().then(seller => {
        res.send(seller)
    })
}
)

//route to create a new seller entry; needs name, firstname, email and phone
sellerRouter.post("/seller", (req, res) => {
    sellerDAO.insertSeller(req.body.seller_name,req.body.seller_firstname, req.body.seller_email, req.body.seller_phone).then
    (seller => { res.send(seller) })  
}
)

//route to delete a seller entry; needs operator and parameter
sellerRouter.delete("/seller", (req, res) => {
    sellerDAO.deleteSeller(req.query.operator, req.query.parameter).then
    (seller => { res.send(seller) })  
    })

//route to update a seller entry; needs operator, parameter and new data
sellerRouter.put("/seller", (req, res) => {
    sellerDAO.updateSeller(req.query.operator, req.query.parameter, req.body).then
    (seller => { res.send(seller) })
    })