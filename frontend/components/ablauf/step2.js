import React, { useState, useEffect } from 'react'
import UnderlinedInput from '../underlinedInput'
import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import ButtonYellowBorder from '../buttons/ButtonYellowBorder';
import { UilCheck } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilInfoCircle } from '@iconscout/react-unicons'
import ButtonGrayBorder from '../buttons/ButtonGrayBorder';
import { UilPrint } from '@iconscout/react-unicons'
import { UilLabel } from '@iconscout/react-unicons'
import { UilHistory } from '@iconscout/react-unicons'

import ShoppingCart from '../ShoppingCart';

export default function () {
  const [sellerFirstName, setSellerFirstName] = useState('');
  const [sellerLastName, setSellerLastName] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhoneNumber, setSellerPhoneNumber] = useState('');
  const [seller, setSeller] = useState('');
  let currentSellerID = "";


  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [product, setProduct] = useState('');
  let currentProductID = "";

  const [offer, setOffer] = useState('');

  //add a product to the database
  const handleAddProduct = () => {

    const product = {
      product_name: productName,
      product_price: productPrice,
      product_category: productCategory
    };

    setProduct(product);

    // Reset input fields
    setProductName('');
    setProductCategory('');
    setProductPrice('');

  };

  // cors error bei post request 
  useEffect(() => {
    if (product !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      };
      fetch('http://localhost:8080/api/product', requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          currentProductID = data.product_id
          console.log("Product ID: " + data.product_id)
          handleAssignProductToSeller();
        })
        .catch(error => console.log(error));
    }
  }, [product]);

  //add a Seller to the database
  const handleAddSeller = () => {

    const seller = {
      seller_name: sellerLastName,
      seller_firstname: sellerFirstName,
      seller_email: sellerEmail,
      seller_phone: sellerPhoneNumber
    };

    setSeller(seller);

    // Reset input fields
    setSellerFirstName('');
    setSellerLastName('');
    setSellerEmail('');
    setSellerPhoneNumber('');

  };

  // cors error bei post request 
  useEffect(() => {
    if (seller !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seller)
      };
      fetch('http://localhost:8080/api/seller', requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          currentSellerID = data.seller_id
        })
        .catch(error => console.log(error));
    }
  }, [seller]);

  //assign product to seller
  const handleAssignProductToSeller = () => {
    const offer = {
      product_id: currentProductID,
      seller_id: currentSellerID
    };

    setOffer(offer);
    console.log(offer)
  };

  // cors error bei post request 
  useEffect(() => {
    if (offer !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer)
      };
      fetch('http://localhost:8080/api/offer', requestOptions)
        .then(res => res.json())
        .then(data => { console.log(data) })
        .catch(error => console.log(error));
    }
  }, [offer]);


  const handleSubmit = () => {
    handleAddSeller();
    handleAddProduct();
  }

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
      <div className="relative flex flex-col justify-center py-10">

        <div className="rounded border border-ourLightGrey bg-white">
          <div className="flex flex-row">
            <div className="w-2/5 border-r border-ourLightGray p-4">
              <h3>Infos zum Verkäufer</h3>
              <div className="flex flex-row gap-4">
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
              </div>
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
            <div className="w-3/5 p-4">
              <h3>Produkte des Verkäufers</h3>
              <div className="flex flex-row gap-4">
                <UnderlinedInput
                  id="productName"
                  placeholder="Name des Produkts"
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
                <ButtonSmallJustIcon onClick={handleSubmit} icon={<UilCheck />}></ButtonSmallJustIcon>
                <ButtonYellowBorder onClick={handleSubmit} icon={<UilPlus />} text="Mehr Produkte von diesem Verkäufer hinzufügen"></ButtonYellowBorder>
              </div>
            </div>
          </div>
          <div className="border-t border-ourLightGray p-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <UilInfoCircle className="mr-4 text-ourDarkGray"></UilInfoCircle>
                <p className="mr-2 text-sm">
                  Scanne am besten noch 1 Produkt(e) ein, damit du beim Drucken möglichst effizient bist!
                </p>
              </div>

              <ButtonGrayBorder text="Barcodes ausdrucken" icon={<UilPrint />}></ButtonGrayBorder>
            </div>
          </div>
        </div>



      </div>
      {

      }<div className='mt-4 flex gap-4'>
        <ButtonGrayBorder icon={<UilLabel />} text="Kategorien verwalten"></ButtonGrayBorder>
        <ButtonGrayBorder icon={<UilHistory />} text="Eingetragene Produkte sehen"></ButtonGrayBorder>
      </div>

    </>
  );
}
