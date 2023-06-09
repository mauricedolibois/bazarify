import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const sellerRouter = express.Router()

sellerRouter.use(express.json())
sellerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

sellerRouter.get("/seller", (req, res) => {
    dbConnection.findSeller(req.query.operator, req.query.parameter).then(seller => {
        res.send(seller)
    })
}
)


// useEffect(() => {
//     fetch('http://localhost:8080/api/sellerProducts?seller_id='+idVariable, {method: 'GET'})
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => console.log(error));
//     }, []);

sellerRouter.get("/sellerProducts", (req, res) => {
    dbConnection.getSellersProducts(req.query.seller_id).then(products => {
        res.send(products)
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