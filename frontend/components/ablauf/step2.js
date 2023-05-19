import React, { useState, useEffect } from 'react'
import UnderlinedInput from '../underlinedInput'
import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import ButtonYellowBorder from '../buttons/ButtonYellowBorder';
import { UilCheck } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilInfoCircle } from '@iconscout/react-unicons'
import ButtonGrayBorder from '../buttons/ButtonGrayBorder';
import { UilPrint } from '@iconscout/react-unicons'

export default function () {
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');

  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [product, setProduct] = useState('');


  const handleAddProduct = () => {
    // POST product
    const product = {
      product_name: productName,
      product_price: productPrice,
      product_category: productCategory
    };

    setProduct(product);

    // Log values for testing
    //console.log('Product: ', product);


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
      fetch('http://localhost:8085/api/product', requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => console.log(error));
    }
  }, [product]);

  //GetAllProducts
  /*useEffect(() => {
      fetch('http://localhost:8085/api/allProducts', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setAllProducts(JSON.stringify(data))
        })
        .catch(error => console.log(error + "Bin im Error!"))
    }, [product])*/

  return (
    <>
      <div>
        <h1>2. Annahme</h1>
        <p>
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
                  id="customerFirstName"
                  placeholder="Vorname"
                  value={customerFirstName}
                  onChange={(e) => setCustomerFirstName(e.target.value)}
                />
                <UnderlinedInput
                  id="customerLastName"
                  placeholder="Nachname"
                  value={customerLastName}
                  onChange={(e) => setCustomerLastName(e.target.value)}
                />
              </div>
              <UnderlinedInput
                id="customerEmail"
                placeholder="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
              <UnderlinedInput
                id="customerPhoneNumber"
                placeholder="Telefonnummer"
                value={customerPhoneNumber}
                onChange={(e) => setCustomerPhoneNumber(e.target.value)}
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
                <ButtonSmallJustIcon icon={<UilCheck />}></ButtonSmallJustIcon>
                <ButtonYellowBorder onClick={handleAddProduct} icon={<UilPlus />} text="Mehr Produkte von diesem Verkäufer hinzufügen"></ButtonYellowBorder>
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

    </>
  );
}