import React, { useState, useEffect } from 'react'
import TextInput from '../components/formInput'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const [product, setProduct] = useState("");
  const [allProducts, setAllProducts] = useState("");
  const [id, setID] = useState("");
  

    

   
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
