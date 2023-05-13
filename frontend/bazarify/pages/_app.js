import React, { useState, useEffect } from 'react'
import TextInput from '../components/textField'
import BtnSubmit from '../components/button';

export default function App({ Component, pageProps }) {
  const [inputID, setInputID] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [product, setProduct] = useState("");
  const [allCustomers, setAllCustomers] = useState("");

  
  

    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    };

    //Getproduct
    const operator = "product_id"
    const parameter = 1
    useEffect(() => {
      fetch('http://localhost:8085/api/getProduct?operator='+operator+'&parameter='+parameter)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProduct(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])

    //GetAllCustomers
    useEffect(() => {
      fetch('http://localhost:8085/api/getAllCustomers')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setAllCustomers(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])


  return (
    <>
      <Component {...pageProps} />
      <h1>Hallo Maurice!</h1>

      <form onSubmit={handleFormSubmit}>
          <TextInput label="ID des Artikels:" name="id" value={inputID} onChange={e => setInputID(e.target.value)} />
          <TextInput label="Name des Artikels:" name="name" value={inputName} onChange={e => setInputName(e.target.value)} />
          <TextInput label="Preis des Artikels:" name="price" value={inputPrice} onChange={e => setInputPrice(e.target.value)} />
          <button type='submit'>Submit</button>
          Product:
          <p>{product}</p>
          AllCustomers:
          <p>{allCustomers}</p>
      </form>
    </>
  )
}