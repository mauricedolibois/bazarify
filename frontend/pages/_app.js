import React, { useState, useEffect } from 'react'
import TextInput from '../components/formInput'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

   //PostProduct
   useEffect(() => {
     const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ name: 'Ski', price: 100 })
   };
     fetch('http://backend:8080/api/product', requestOptions)
       .then(res => res.json())
       .then(data => {
         console.log(data)
       })
       .catch(error => console.log(error))
   }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
