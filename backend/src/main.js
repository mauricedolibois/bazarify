import express, { urlencoded } from 'express'
import cors from'cors'
const app = express()
import { dbConnection } from './database/DbConnection.js';
//alles auf require umstellen
//mehr aufsplitten api routen unterrouten /produkte /kunden /verkäufe put update delete

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));


dbConnection.connectToDB()

//dbConnection.deleteAllProducts()
//dbConnection.deleteAllCustomers()
//dbConnection.deleteAllSales()
//dbConnection.close()
//dbConnection.findProduct("product_id", 1).then(product => {console.log(product)})
//dbConnection.updateProduct("product_id", 1, {product_name: "test2"})
//dbConnection.findAllCustomers().then(customer => {console.log(customer)})

//api router auf /api in seperaten datei
//in der main die homepage
//middleware regsitrieren
//Get from DB
app.get("/api/getProduct", (req, res) => {
  dbConnection.findProduct(req.query.operator, req.query.parameter).then(product => {
    res.send(product)
  })
})

app.get("/api/getCustomer", (req, res) => {
  dbConnection.findCustomer(req.query.operator, req.query.parameter).then(customer => {
    res.send(customer)
  })
})

app.get("/api/getSale", (req, res) => {
  dbConnection.findSale(req.query.operator, req.query.parameter).then(sale => {
    res.send(sale)
  })
})

app.get("/api/getAllProducts", (req, res) => {
  dbConnection.findAllProducts().then(product => {
    res.send(product)

  })
})

app.get("/api/getAllCustomers", (req, res) => {
  dbConnection.findAllCustomers().then(customer => {
    res.send(customer)
  })
})

app.get("/api/getAllSales", (req, res) => {
  dbConnection.findAllSales().then(sale => {
    res.send(sale)
  })
})



app.listen(8085, () => { console.log("Server started on port 8085") })


//controller für die api
//router für die api
//services für die api
//middleware für logging authentifizierung (quests rausfiltern)