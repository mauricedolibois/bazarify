import React, { useState, useEffect } from 'react'
import TextInput from '../components/textField'
import BtnSubmit from '../components/button';

export default function App({ Component, pageProps }) {
  const [product, setProduct] = useState("");
  const [allProducts, setAllProducts] = useState("");
  const [id, setID] = useState("");
  

    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    };

    //Getproduct
    const operator = "product_id"
    useEffect(() => {
      fetch('http://localhost:8085/api/product?operator='+[operator]+'&parameter='+id, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProduct(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [id])//id hier rein (dependency array) damit useEffect bei jeder änderung von id triggert

    //GetAllProducts
    useEffect(() => {
      fetch('http://localhost:8085/api/allProducts', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setAllProducts(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])

    // //PostProduct
    // useEffect(() => {
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name: 'Ski', price: 100 })
    // };
    //   fetch('http://localhost:8085/api/product', requestOptions)
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data)
    //     })
    //     .catch(error => console.log(error))
    // }, [])

  return (
    <>
      <Component {...pageProps} />
      <h1>Produkte</h1>

      <form>
          <TextInput label="ID suchen: " type="number" value={id} onChange={e => setID(e.target.value)} />
      </form>  
          <p>{product}</p>

          allProducts:
          <p>{allProducts}</p>
    </>
  )
}
