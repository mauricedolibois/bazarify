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

offerRouter.post("/offer", (req, res) => {
    dbConnection.insertOffer(req.body.product_id, req.body.customer_id).then
    (offer => { res.send(offer) })  
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
