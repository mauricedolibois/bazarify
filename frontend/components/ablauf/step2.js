import React, { useState, useEffect } from 'react'
import UnderlinedInput from '../underlinedInput'
import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import ButtonYellowBorder from '../buttons/ButtonYellowBorder';
import { UilCheck } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilInfoCircle } from '@iconscout/react-unicons'
import ButtonGrayBorder from '../buttons/ButtonGrayBorder';
import { UilPrint } from '@iconscout/react-unicons'
import { UilHistory } from '@iconscout/react-unicons'

export default function () {
  const [sellerFirstName, setSellerFirstName] = useState('');
  const [sellerLastName, setSellerLastName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhoneNumber, setSellerPhoneNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [product, setProduct] = useState('');
  const [seller, setSeller] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //add a Seller to the database
  const handleAddOffer = (keepSeller) => {
    console.log('add offer');
    const sellerData = {
      seller_name: sellerLastName,
      seller_firstname: sellerFirstName,
      seller_email: sellerEmail,
      seller_phone: sellerPhoneNumber
    };

    const productData = {
      product_name: productName,
      product_price: productPrice,
      product_category: productCategory
    };

    setProduct(productData);
    setSeller(sellerData);

    // Reset input fields
    if (keepSeller === false) {
      setSellerFirstName('');
      setSellerLastName('');
      setSellerEmail('');
      setSellerPhoneNumber('');
    }
    setProductName('');
    setProductCategory('');
    setProductPrice('');
  }

  // cors error bei post request 
  useEffect(() => {
    if (product !== '' && seller !== '') {
      fetch('http://localhost:8080/api/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: product,
          seller: seller
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (typeof data === 'object' && data !== null) {
            console.log('success');
            setErrorMessage('');
          }
          else {
            console.log("error");
            //TODO: specific error message
            setErrorMessage("Fehler beim Hinzufügen des Angebots, bitte überprüfe deine Eingaben!");
          }
        })
        .catch(error => {
          setErrorMessage(error);
          console.log(error)
        });
    }
  }, [product, seller]);



  return (
    <>
      <div>

        <h1>2. Annahme</h1>
        <p className='mb-4'>
          Jetzt kannst du damit anfangen die Produkte verschiedener Verkäufer hinzuzufügen. Wenn du das erledigt hast,
          kannst du im nächsten Schritt die Verkäufe einscannen. Das solltest du aber erst machen, wenn alle Produkte
          eingepflegt sind.
        </p>
      </div>
      <div className="relative flex flex-col justify-center">

        <div className="rounded border border-ourLightGrey bg-white">
          <div className="flex flex-row">
            <div className="w-[36%] border-r pb-8 border-ourLightGray py-4 px-8">
              <h3 className=''>Infos zum Verkäufer</h3>

              <UnderlinedInput
                id="sellerFirstName"
                placeholder="Vorname"
                value={sellerFirstName}
                onChange={(e) => setSellerFirstName(e.target.value)}
              />
              <UnderlinedInput
                id="sellerLastName"
                placeholder="Nachname"
                value={sellerLastName}
                onChange={(e) => setSellerLastName(e.target.value)}
              />

              <UnderlinedInput
                id="sellerEmail"
                placeholder="Email"
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
              />
              <UnderlinedInput
                id="sellerPhoneNumber"
                placeholder="Telefonnummer"
                value={sellerPhoneNumber}
                onChange={(e) => setSellerPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-[64%] py-4 px-8">
              <h3 className=''>Produkte des Verkäufers</h3>
              <div className="flex flex-row gap-4">
                <UnderlinedInput
                  id="productName"
                  placeholder="Produktname"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <UnderlinedInput
                  id="productCategory"
                  placeholder="Kategorie"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                />
                <UnderlinedInput
                  id="productPrice"
                  placeholder="Preis in €"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <div className="mt-4 gap-4 flex">
                <ButtonSmallJustIcon onClick={() => handleAddOffer(true)} tooltip="Weitere Produkte dieses Verkäufers hinzufügen" icon={<UilPlus />}></ButtonSmallJustIcon>
                <ButtonYellowBorder onClick={() => handleAddOffer(false)} icon={<UilPrint />} text="Barcodes ausdrucken"></ButtonYellowBorder>
              </div>
            </div>
          </div>
          <div className="border-t border-ourLightGray p-4">
            <div className="flex flex-row justify-between">

              <div className="flex flex-row items-center">
                <UilInfoCircle className="mr-4 text-ourDarkGray"></UilInfoCircle>
                <p className="text-sm">
                  {errorMessage ? (
                    <span className="text-red-400">Fehler beim Hinzufügen des Angebots, bitte überprüfe deine Eingaben!</span>
                  ) : (
                    "Scanne einfach alle Produkte eines Verkäufers ein und drucke dann die Barcodes oben aus"
                  )}
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
      {/*
      <div className='mt-4 flex gap-4'>
        <ButtonGrayBorder icon={<UilLabel />} text="Kategorien verwalten"></ButtonGrayBorder>
        <ButtonGrayBorder icon={<UilHistory />} text="Eingetragene Produkte sehen"></ButtonGrayBorder>
      </div>
      */}


    </>
  )
}
