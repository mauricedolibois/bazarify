import express, { urlencoded } from 'express'
import cors from'cors'
const app = express()
import { dbConnection } from './database/DbConnection.js';


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

dbConnection.insertProduct("test", 69)
dbConnection.insertCustomer("bucher", "maik", "maik@bucher.de", 12345)
dbConnection.insertSale(1,1,1)

//dbConnection.findProduct("product_id", 1).then(product => {console.log(product)})
//dbConnection.updateProduct("product_id", 1, {product_name: "test2"})
//dbConnection.findAllCustomers().then(customer => {console.log(customer)})


//Get from DB
app.get("/api/getProduct", (req, res) => {
  const filter = {[req.query.operator]: req.query.parameter}
  dbConnection.findProduct(filter).then(product => {
    res.send(product)
    console.log(product)
  })
})

app.get("/api/getCustomer", (req, res) => {
  const filter = {[req.query.operator]: req.query.parameter}
  dbConnection.findCustomer(filter).then(customer => {
    res.send(customer)
  })
})

app.get("/api/getSale", (req, res) => {
  const filter = {[req.query.operator]: req.query.parameter}
  dbConnection.findSale(filter).then(sale => {
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


