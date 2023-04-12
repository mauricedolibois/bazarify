import React,{useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response =>  response.json()
    ).then(
      data => { setBackendData(data) }
    )
  }, [])

  return (
    <div>
      {(typeof backendData.backendData === 'undefined') ? (<p>loading...</p>) : (backendData.backendData.map((data, i) => <p key={i}>{data}</p>))}	
    </div>
  )
}

export default App