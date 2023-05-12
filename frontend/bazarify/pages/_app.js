import React, { useState, useEffect } from 'react'
import TextInput from '../components/textField'
import BtnSubmit from '../components/button';
import JsBarcode from 'jsbarcode';

export default function App({ Component, pageProps }) {
  const [backendData, setBackendData] = useState(undefined);
  const [inputID, setInputID] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [text, setText] = useState("");

  
    const createBarcode = async (event) => {
      JsBarcode("#barcode", Math.floor(10000000000 + Math.random() * 90000000000), {
        format: "upc",
        lineColor: "#000000",
        width: 2,
        height: 20,
        displayValue: true
      });
    }

    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 
      'Content-Type': 'application/json', 'Content-Type': 'Access-Control-Allow-Origin'},
      body: 
            JSON.stringify(
              {
                "id" : inputID,
                "name" : inputName,
                "price" : inputPrice
              }
            )
      
    };
    console.log(requestOptions)
    try{
      console.log("try ausgeführt")
      await fetch('http://localhost:8080/api/add-product', requestOptions)
            .then(response => response.json())
            .then(data => console.log("data"))
    } catch (error){
      console.log("Catch Error: " + error.response)
    }
    };

    useEffect(() => {
      fetch('http://localhost:8080/api')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setText(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])


  return (
    <>
      <Component {...pageProps} />
      <h1>Hallo Maurice!</h1>
      <div>
        {(backendData && typeof backendData.backendData === 'undefined') ? (<p>loading...</p>) : (backendData?.backendData?.map((data, i) => <p key={i}>{data}</p>))}
        
      </div>
      <div onClick={createBarcode}>
        <button id='TestBarcode'>Create Barcode</button>
        <svg id="barcode"></svg>
      </div>

      <form onSubmit={handleFormSubmit}>
          <TextInput label="ID des Artikels:" name="id" value={inputID} onChange={e => setInputID(e.target.value)} />
          <TextInput label="Name des Artikels:" name="name" value={inputName} onChange={e => setInputName(e.target.value)} />
          <TextInput label="Preis des Artikels:" name="price" value={inputPrice} onChange={e => setInputPrice(e.target.value)} />
          <button type='submit'>Submit</button>
          <p>{text}</p>
      </form>
    </>
  )
}