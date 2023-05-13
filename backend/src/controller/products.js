import express from 'express'
import cors from'cors'
import { dbConnection } from '../database/DbConnection.js';
export const productRouter = express.Router()

productRouter.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));


//  //Getproduct
//  const operator = "product_id"
//  useEffect(() => {
//    fetch('http://localhost:8085/api/product?operator='+[operator]+'&parameter='+id, {method: 'GET'})
//      .then(res => res.json())
//      .then(data => {
//        console.log(data)
//        setProduct(JSON.stringify(data))
//      })
//      .catch(error => console.log(error))
//  }, [id])//id hier rein (dependency array) damit useEffect bei jeder änderung von id triggert
productRouter.get("/product", (req, res) => {
    dbConnection.findProduct(req.query.operator, req.query.parameter).then(product => {
        res.send(product)
        console.log(product)
    })
}
)

// //GetAllProducts
// useEffect(() => {
//     fetch('http://localhost:8085/api/allProducts', {method: 'GET'})
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         setAllProducts(JSON.stringify(data))
//       })
//       .catch(error => console.log(error))
//   }, [])
productRouter.get("/allProducts", (req, res) => {
    dbConnection.findAllProducts().then(product => {
        res.send(product)
    })
}
)

 // //PostProduct
//  const name = "Ski"
//  const price = 100
//  const category = "Sport"
//  useEffect(() => {
//    const requestOptions = {
//      method: 'POST',
//      headers: { 'Content-Type': 'application/json' },
//      body: JSON.stringify({ name: name, price: price, category: category })
//  };
//    fetch('http://localhost:8085/api/product', requestOptions)
//      .then(res => res.json())
//      .then(data => {
//        console.log(data)
//      })
//      .catch(error => console.log(error))
//  }, [])
productRouter.post("/product", (req, res) => {
    dbConnection.insertProduct(req.body.name, req.body.price, req.body.category).then
    (product => { res.send(product) })  
    })


//deleteProduct
// const operator = "product_id"
// const id=25250
// useEffect(() => {
//   fetch('http://localhost:8085/api/product?operator='+[operator]+'&parameter='+id, {method: 'DELETE'})
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => console.log(error))
// }, [])    
productRouter.delete("/product", (req, res) => {
    dbConnection.deleteProduct(req.query.operator, req.query.parameter).then
    (product => { res.send(product) })  
    })


productRouter.put("/product", (req, res) => {
    dbConnection.updateProduct(req.query.operator, req.query.parameter, req.body).then
    (product => { res.send(product) })
    })



