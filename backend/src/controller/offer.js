import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const offerRouter = express.Router()



offerRouter.use(express.json())
offerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

offerRouter.get("/offer", (req, res) => {
    dbConnection.findOffer(req.query.operator, req.query.parameter).then(offer => {
        res.send(offer)
    })
}
)

offerRouter.get("/allOffers", (req, res) => {
    dbConnection.findAllOffers().then(offer => {
        res.send(offer)
    })
}
)


offerRouter.post("/offer", async (req, res) => {
    try {
        const p = req.body.product;
        const s = req.body.seller;
        console.log(p);
        console.log(s);
        const prod = await dbConnection.insertProduct(p.product_name,p.product_price,p.product_category)
        const sell = await dbConnection.insertSeller(s.seller_name,s.seller_firstname,s.seller_email,s.seller_phone)
        const offer = await dbConnection.insertOffer(prod.product_id, sell.seller_id);
        res.json(offer);  
    } catch (error) {
        res.json(error.message); 
    }
}
)



offerRouter.delete("/offer", (req, res) => {
    dbConnection.deleteOffer(req.query.operator, req.query.parameter).then
    (offer => { res.send(offer) })  
    }
)

offerRouter.put("/offer", (req, res) => {
    dbConnection.updateOffer(req.query.operator, req.query.parameter, req.body).then
    (offer => { res.send(offer) })
    }
)
// let prod=dbConnection.insertProduct(req.body.product)
//     let sell=dbConnection.insertSeller(req.body.seller)
//     dbConnection.insertOffer(prod.product_id, sell.seller_id).then
//     (offer => { res.send(offer) }) 
