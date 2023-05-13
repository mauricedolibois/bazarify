import React, { useState, useEffect } from 'react'
import TextInput from '../components/textField'
import BtnSubmit from '../components/button';

export default function App({ Component, pageProps }) {
  const [product, setProduct] = useState("");
  const [allProducts, setAllProducts] = useState("");
  

    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    };

    //Getproduct
    const inputID = 1
    const operator = "product_id"
    useEffect(() => {
      fetch('http://localhost:8085/api/getProduct?operator='+operator+'&parameter='+inputID)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProduct(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])

    //GetAllProducts
    useEffect(() => {
      fetch('http://localhost:8085/api/getAllProducts')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setAllProducts(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])


  return (
    <>
      <Component {...pageProps} />
      <h1>Hallo Maurice!</h1>

      <form onSubmit={handleFormSubmit}>
          
          Product:
          <p>{product}</p>

          allProducts:
          <p>{allProducts}</p>
      </form>
    </>
  )
}