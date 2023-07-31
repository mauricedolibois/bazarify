import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
import { exampleData } from '../exampleData.js';
import { analyticsDAO } from '../database/operations/AnalyticsDAO.js';
import { infoDAO } from '../database/operations/InfoDAO.js';
export const bazarRouter = express.Router()

//security stuff
bazarRouter.use(express.json())
bazarRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

//route to create new Bazar in DB, needs name, year, commission and description as input
bazarRouter.post("/newBazar", (req, res) => {
    console.log("Now adding new Bazar")
    dbConnection.newDB(req.body.bazar_name, req.body.bazar_year, req.body.bazar_commission, req.body.bazar_description).then(response => {
        res.json(response)
    })
})

//route to change active Bazar, needs name as input
bazarRouter.get("/changeBazar", (req, res) => {
    console.log("Now changing Bazar")
    dbConnection.changeDB(req.query.operator).then(bazar => {
        res.json(bazar)
    })
})

//route to get all Bazar names
bazarRouter.get("/getBazars", (req, res) => {
    dbConnection.getBazars().then(bazar => {
        res.send(bazar)
    })
})

//route to delete Bazar, needs name as input
bazarRouter.delete("/deleteBazar", (req, res) => {
    dbConnection.dropBazar(req.query.operator).then(bazar => {
        res.send(bazar)
    })
})

//route to get current Bazar name
bazarRouter.get("/currentBazar", (req, res) => {
    dbConnection.getCurrentBazar().then(bazar => {
        res.json(bazar)
    })
})

//route to get all Bazar infos (Revenue, Provision, Tips, Offers, Sellers, Products, SoldProducts, UnsoldProducts)
bazarRouter.get("/analytics", (req, res) => {
    analyticsDAO.analytics().then(ana => {
        res.json(ana)
    })
})


//set tips in Bazar Info
bazarRouter.post("/tip", (req, res) => {
    infoDAO.addTip(req.body.tip).then(tip => {
        res.json(tip)
    }
    )
})

//creates Demo Bazar with demo data
bazarRouter.put("/loadExampleData", (req, res) => {
    exampleData.createExampleData()
    res.json("Example Data created")
})

