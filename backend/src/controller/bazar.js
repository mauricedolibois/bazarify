import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const bazarRouter = express.Router()

bazarRouter.use(express.json())
bazarRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

bazarRouter.get("/newBazar", (req, res) => {
    console.log("Now changing Bazar")
    dbConnection.changeDB(req.query.operator).then(bazar => {
        res.send(bazar)
    })
})

//  const operator = "newBazarName"
//  useEffect(() => {
//    fetch('http://localhost:8085/api/newBazar?operator='+[operator]+'&parameter=', {method: 'GET'})
//      .then(res => res.json())
//      .then(data => {
//        console.log(data)
//      })
//      .catch(error => console.log(error))