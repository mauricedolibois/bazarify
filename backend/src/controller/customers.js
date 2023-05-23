import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const customerRouter = express.Router()

customerRouter.use(express.json())
customerRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

customerRouter.get("/customer", (req, res) => {
    dbConnection.findCustomer(req.query.operator, req.query.parameter).then(customer => {
        res.send(customer)
        console.log("Customer: " + customer)
    })
}
)

customerRouter.get("/allCustomers", (req, res) => {
    dbConnection.findAllCustomers().then(customer => {
        res.send(customer)
    })
}
)

customerRouter.post("/customer", (req, res) => {
    dbConnection.insertCustomer(req.body.customer_name,req.body.customer_firstname, req.body.customer_email, req.body.customer_phone).then
    (customer => { res.send(customer) })  
}
)

customerRouter.delete("/customer", (req, res) => {
    dbConnection.deleteCustomer(req.query.operator, req.query.parameter).then
    (customer => { res.send(customer) })  
    })

customerRouter.put("/customer", (req, res) => {
    dbConnection.updateCustomer(req.query.operator, req.query.parameter, req.body).then
    (customer => { res.send(customer) })
    })