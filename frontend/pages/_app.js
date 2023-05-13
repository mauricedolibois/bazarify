import React, { useState, useEffect } from 'react'
import TextInput from '../components/formInput'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const [product, setProduct] = useState('')

  useEffect(() => {
        fetch('http://localhost:8085/api/allProducts', {method: 'GET'})
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setProduct(JSON.stringify(data))
          })
          .catch(error => console.log(error))
      }, [])

  //updateProduct
  const newProduct={name: "SKYYYY", price: 1, category: "sort"}
  const operator = "product_id"
  const id=950966
  useEffect(() => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
  };
    fetch('http://localhost:8085/api/product?operator='+[operator]+'&parameter='+id, requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
  }, [])
  

  return (
    <>
      <Component {...pageProps} />
      <p>{product}</p>
    </>
  )
}
