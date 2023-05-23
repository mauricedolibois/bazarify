import express, { urlencoded } from 'express'
import cors from'cors'
const app = express()
import  {dbConnection} from './database/DbConnection.js';
import {productRouter}  from './controller/products.js';
import {sellerRouter}  from './controller/seller.js';
import {saleRouter}  from './controller/sales.js';
import { bazarRouter } from './controller/bazar.js';

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/api', productRouter)
app.use('/api', sellerRouter)
app.use('/api', saleRouter)
app.use('/api', bazarRouter)

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));

//api auf homepage verlinken
app.get('/', (req, res) => {
  res.send('localhost:8085/api')
})


dbConnection.connectToDB()
app.listen(8085, () => { console.log("Server started on port 8085") })


//alles auf require umstellen
//middleware regsitrieren
//middleware für logging authentifizierung (quests rausfiltern)