import React, { useState, useEffect } from 'react'
import TextInput from '../components/formInput'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
