import React, { useState } from 'react'
import TextInput from '../components/inputField'
import BtnSubmit from '../components/btnSubmit';

export default function App({ Component, pageProps }) {
  const [backendData, setBackendData] = useState(undefined);
  const [inputID, setInputID] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  
  

    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      await fetch('http://localhost:8085/api/add-product', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    } catch (error){
      console.log("Catch Error: " + error.response)
    }
    };

    /*const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log("ID: " + inputID + "Name: " + inputName + "Price: "+ inputPrice);
    }; */

    //TODO: fix submit 


  return (
    <>
      <Component {...pageProps} />
      <h1>Hallo Maurice!</h1>
      <div>
        {(backendData && typeof backendData.backendData === 'undefined') ? (<p>loading...</p>) : (backendData?.backendData?.map((data, i) => <p key={i}>{data}</p>))}
      </div>

      <form onSubmit={handleFormSubmit}>
          <TextInput label="ID des Artikels:" name="id" value={inputID} onChange={e => setInputID(e.target.value)} />
          <TextInput label="Name des Artikels:" name="name" value={inputName} onChange={e => setInputName(e.target.value)} />
          <TextInput label="Preis des Artikels:" name="price" value={inputPrice} onChange={e => setInputPrice(e.target.value)} />
          <button type='submit'>Submit2</button>
      </form>
    </>
  )
}
