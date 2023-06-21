import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
import { off } from '../database/schemas/ProductSchema.cjs';
import PrintingService from '../services/PrintingService.cjs';
export const offerRouter = express.Router()

var pendingProducts = []

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


offerRouter.post("/FinishOffer", async (req, res) => {
    var offers = []
    for (let i = 0; i < pendingProducts.length; i++) {
        if (pendingProducts[i].product_id == req.body.product_id) {
            try {
                const p = pendingProducts[i];
                const s = req.body.seller;
                const prod = await dbConnection.insertProduct(p.product_name,p.product_price,p.product_category).catch(error => console.log(error));
                const sell = await dbConnection.insertSeller(s.seller_name,s.seller_firstname,s.seller_email,s.seller_phone).catch(error => console.log(error));
                offers.push(await dbConnection.insertOffer(prod.product_id, sell.seller_id)); 
            } catch (error) {
                console.log(error);  
            }
        }
    }
    try{
        PrintingService.printProduct(offers)
    }
    catch{
        console.log("could not print products")
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
