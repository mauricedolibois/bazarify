import React, { useState } from 'react'
import TextInput from '../components/inputField'
import SubmitButton from '../components/btnSubmit'

export default function App({ Component, pageProps }) {
  const [inputValues, setInputValues] = useState({ id: '', name: '', price: '' });
  const [backendData, setBackendData] = useState(undefined);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  

  /*const handleFormSubmit = (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputValues)
    };
    fetch('/api/add-product', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      console.log("LOG: Form sent!")
    };
  */

    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log(inputValues);
    };

    //TODO: fix submit 


  return (
    <>
      <Component {...pageProps} />
      <h1>Hallo Maurice!</h1>
      <div>
        {(backendData && typeof backendData.backendData === 'undefined') ? (<p>loading...</p>) : (backendData?.backendData?.map((data, i) => <p key={i}>{data}</p>))}
      </div>

      <form onSubmit={handleFormSubmit}>
        <div>
          <TextInput label="ID des Artikels:" name="id" value={inputValues.id} onChange={handleTextChange} />
          <TextInput label="Name des Artikels:" name="name" value={inputValues.name} onChange={handleTextChange} />
          <TextInput label="Preis des Artikels:" name="price" value={inputValues.price} onChange={handleTextChange} />
        </div>
        <SubmitButton />
      </form>
    </>
  )
}
