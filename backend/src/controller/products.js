import express from 'express'
import cors from'cors'
import { productDAO } from '../database/ProductDAO.js';
import { offerDAO } from '../database/OfferDAO.js';
export const productRouter = express.Router()
var pendingProducts = []

productRouter.use(express.json())
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
    productDAO.findProduct(req.query.operator, req.query.parameter).then(product => {
        res.send(product)
    })
}
)

// //GetAllProducts
// useEffect(() => {
//     fetch('http://localhost:8085/api/allProducts', {method: 'GET'})
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)^
//         setAllProducts(JSON.stringify(data))
//       })
//       .catch(error => console.log(error))
//   }, [])
productRouter.get("/allProducts", (req, res) => {
    productDAO.findAllProducts().then(product => {
        res.send(product)
    })
}
)

 // //PostProduct
// const product = {product_name: "skirt", product_price: 1, product_category: "short"}
//  useEffect(() => {
//    const requestOptions = {
//      method: 'POST',
//      headers: { 'Content-Type': 'application/json' },
//      body: JSON.stringify(product)
//  };
//    fetch('http://localhost:8085/api/product', requestOptions)
//      .then(res => res.json())
//      .then(data => {
//        console.log(data)
//      })
//      .catch(error => console.log(error))
//  }, [])
productRouter.post("/product", (req, res) => {
    productDAO.insertProduct(req.body.product_name, req.body.product_price, req.body.product_category).then
    (product => { res.send(product) })  
    })

productRouter.post('/addPendingProduct', (req, res) => {
    const product = req.body;
          
    pendingProducts.push(product);
          
    res.send(pendingProducts);
})

productRouter.put("/DeletePendingProduct", (req, res) => {
    pendingProducts = [];
    res.send(pendingProducts);
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
    productDAO.deleteProduct(req.query.operator, req.query.parameter).then
    (product => { res.send(product) })  
    })


//updateProduct
// const newProduct={product_name: "skir", product_price: 1, product_category: "sort"}
// const operator = "product_id"
// const id=950966
// useEffect(() => {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newProduct)
// };
//   fetch('http://localhost:8085/api/product?operator='+[operator]+'&parameter='+id, requestOptions)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => console.log(error))
// }, [])
productRouter.put("/product", (req, res) => {
    productDAO.updateProduct(req.query.operator, req.query.parameter, req.body).then
    (product => { res.send(product) })
    })



productRouter.put("/product-recline", (req, res) => {
    console.log("recline")
    offerDAO.updateOffer('product_id', req.query.id, {state: 'reclined'}).then
    (product => { res.send(product) })
    })


