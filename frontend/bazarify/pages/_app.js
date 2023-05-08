import React, { useState, useEffect, use } from 'react'
import TextInput from '../components/textField'
import BtnSubmit from '../components/button';
import JsBarcode from 'jsbarcode';
import "./app.css";


export default function App({ Component, pageProps }) {
  const [backendData, setBackendData] = useState(undefined);
  const [inputID, setInputID] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [text, setText] = useState("");


  // hinzufügen eines Items
    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 
      'Content-Type': 'application/json'},
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
      await fetch('http://localhost:8085/api/add-product', requestOptions)
            .then(response => response.json())
            .then(data => console.log("data"))
    } catch (error){
      console.log("Catch Error: " + error.response)
    }
    };


    // deleten eines Items
    async function deleteItem(item)
    {
      const requestOptions = {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       },
       body:
         JSON.stringify(
           {
             "id": item.id
           }
         )
     };
     await fetch('http://localhost:8085/api/deleteproduct', requestOptions)
    }

    // async function getItem(id)
    // {
    //   const requestOptions = {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body:
    //       JSON.stringify(
    //         {
    //           "id": id
    //         }
    //       )
    //   };
    //   try{
    //   await fetch('http://localhost:8085/api/getproduct', requestOptions)
    //   .then(response => response.json())
    //   } catch (error){
    //     console.log("Catch Error: " + error.response)
    //   }
    // }


    // ausgeben aller Items
      useEffect(() => {
      fetch('http://localhost:8085/api/all')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setBackendData(data)
        })
        .catch(error => console.log(error))
    }, [])


    // Barcode generieren
    function toBarcode(id) {
      JsBarcode("#barcode", id, {
        format: "upc",
        lineColor: "#000000",
        width: 2,
        height: 20,
        displayValue: true
      });
    }


  return (
    <>
      <Component {...pageProps}/>
      <h1>Bazarify MVP</h1>

      {/* <h2>SearchProduct</h2>
      <TextInput label="ID des Artikels:" name="id" value={inputID} onChange={e => setInputID(e.target.value)} />
      <button onClick={() => getItem(inputID)}>Search</button> */}
      <form onSubmit={handleFormSubmit}>
      <h2>Input</h2>
          <TextInput label="Name des Artikels:" name="name" value={inputName} onChange={e => setInputName(e.target.value)} />
          <TextInput label="Preis des Artikels:" name="price" value={inputPrice} onChange={e => setInputPrice(e.target.value)} />
          <button type='submit' onClick={() => {
            setInputID(Math.floor(10000000000 + Math.random() * 90000000000).toString())
            window.location.reload()}}>Submit</button>
          <p>{text}</p>
      </form>

      <div id="products">
      <h2>Products</h2>
      <svg id="barcode"></svg>
      <div>
        {(backendData && typeof backendData.backendData === 'undefined') ? (<p>loading...</p>) : (backendData && backendData.backendData.map((item, index) => ( <p key={index}>
        {toBarcode(item.id)}
        {item.id} | {item.name} | {item.price}$ &nbsp; &nbsp;
        
        <button onClick={ () =>{
          toBarcode(item.id)
          }}>Barcode</button>

        &nbsp;

        <button onClick={async () =>{
          await deleteItem(item)
          window.location.reload()
          }}>Delete</button>

        </p>)))}
      </div>
      </div>
    </>
  )
} 