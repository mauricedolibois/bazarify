import '@/styles/globals.css'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [backendData, setBackendData] = useState([{}])

 useEffect(() => {
    fetch("/api").then(
      response =>  response.json()
    ).then(
      data => { setBackendData(data) }
    )
  }, [])

  return <>
    <Component {...pageProps} />
    <h1>Hallo Maurice!</h1>
    <div>
      {(typeof backendData.backendData === 'undefined') ? (<p>loading...</p>) : (backendData.backendData.map((data, i) => <p key={i}>{data}</p>))}
    </div>

  </>
}
