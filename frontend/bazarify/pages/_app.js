import React, { useState, useEffect } from 'react'
import TextInput from '../components/textField'
import BtnSubmit from '../components/button';

export default function App({ Component, pageProps }) {
  const [operator, setOperator] = useState("product_id");
  const [inputID, setInputID] = useState();
  const [product, setProduct] = useState("");
  const [allProducts, setAllProducts] = useState("");
  

    const handleFormSubmit = async (event) => {
    console.log("LOG: handeFormSubmit triggert")
    event.preventDefault();
    };

    //Getproduct
    useEffect(() => {
      fetch('http://localhost:8085/api/getProduct?operator='+operator+'&parameter='+inputID)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProduct(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])

    //GetAllProducts
    useEffect(() => {
      fetch('http://localhost:8085/api/getAllProducts')
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setAllProducts(JSON.stringify(data))
        })
        .catch(error => console.log(error))
    }, [])


  return (
    <>
      <Component {...pageProps} />
      <h1>Hallo Maurice!</h1>

      <form onSubmit={handleFormSubmit}>
          <TextInput label="Search ProductID:" name="id" value={inputID} onChange={e => setInputID(e.target.value)} />
          <button type='submit' onClick={()=>{window.location.reload()} }>Submit</button>
          <br/><br/>
          Product:
          <p>{product}</p>

          allProducts:
          <p>{allProducts}</p>
      </form>
    </>
  )
}