import express, { urlencoded } from 'express'
import cors from'cors'
const app = express()
import  {dbConnection} from './database/DbConnection.js';
import {productRouter}  from './controller/products.js';
import {customerRouter}  from './controller/customers.js';
import {saleRouter}  from './controller/sales.js';

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/api', productRouter)
app.use('/api', customerRouter)
app.use('/api', saleRouter)

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));


dbConnection.connectToDB()

app.listen(8085, () => { console.log("Server started on port 8085") })


//alles auf require umstellen
//mehr aufsplitten api routen unterrouten /produkte /kunden /verkäufe put update delete
//api router auf /api in seperaten dateien
//api auf homepage verlinken
//middleware regsitrieren
//controller für die api
//router für die api
//services für die api
//middleware für logging authentifizierung (quests rausfiltern)