import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
import { exampleData } from '../exampleData.js';
import { analyticsDAO } from '../database/AnalyticsDAO.js';
import { infoDAO } from '../database/InfoDAO.js';
export const bazarRouter = express.Router()

bazarRouter.use(express.json())
bazarRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

bazarRouter.post("/newBazar", (req, res) => {
    console.log("Now adding new Bazar")
    console.log(req.body)
    dbConnection.newDB(req.body.bazar_name, req.body.bazar_year, req.body.bazar_commission, req.body.bazar_description).then(response => {
        res.json(response)
    })
})


bazarRouter.get("/changeBazar", (req, res) => {
    console.log("Now changing Bazar")
    dbConnection.changeDB(req.query.operator).then(bazar => {
        res.json(bazar)
    })
})

bazarRouter.get("/getBazars", (req, res) => {
    dbConnection.getBazars().then(bazar => {
        res.send(bazar)
    })
})

//needs a name
bazarRouter.delete("/deleteBazar", (req, res) => {
    dbConnection.dropBazar(req.query.operator).then(bazar => {
        res.send(bazar)
    })
})

bazarRouter.get("/currentBazar", (req, res) => {
    dbConnection.getCurrentBazar().then(bazar => {
        res.json(bazar)
    })
})

bazarRouter.get("/analytics", (req, res) => {
    analyticsDAO.analytics().then(ana => {
        res.json(ana)
    })
})


//set tips
bazarRouter.post("/tip", (req, res) => {
    infoDAO.addTip(req.body.tip).then(tip => {
        res.json(tip)
    }
    )
})

//set tips
bazarRouter.put("/loadExampleData", (req, res) => {
    exampleData.createExampleData()
    res.json("Example Data created")
})

