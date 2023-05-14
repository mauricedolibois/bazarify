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
  

  return (
    <>
      <Component {...pageProps} />
      <p>{product}</p>
    </>
  )
}
