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
let i=0
if(i==1) {
dbConnection.deleteAllProducts()
dbConnection.deleteAllCustomers()
dbConnection.deleteAllSales()
}
else {
dbConnection.insertProduct(1,"test", 69)
dbConnection.insertCustomer(1,"bucher", "maik", "maik@bucher.de", 12345)
dbConnection.insertSale(1,1,1)
}

//Get from DB
// app.get("/api", (req, res) => {
//     pmanager.getProductById("211").then(product => {
//         console.log(product)
//     res.json({"backendData":[product.name, product.price] })
// })
// })

app.listen(8085, () => { console.log("Server started on port 8085") })


