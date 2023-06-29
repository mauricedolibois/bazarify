import React, { useState, useEffect, useRef } from 'react'
import UnderlinedInput from '../underlinedInput'
import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import ButtonYellowBorder from '../buttons/ButtonYellowBorder';
import { UilCheck } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilInfoCircle } from '@iconscout/react-unicons'
import ButtonGrayBorder from '../buttons/ButtonGrayBorder';
import { UilPrint } from '@iconscout/react-unicons'
import { UilHistory } from '@iconscout/react-unicons'
import ProductTable from '../productTable';
import Step3TableRow from '../Step3TableRow';

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

  const [pendingProducts, setPendingProducts] = useState([]);
  const [pendingOffers, setPendingOffers] = useState([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const handleAddPendingProduct = () => {
    console.log('add pending product');

    const productData = {
      product_name: productName,
      product_price: productPrice,
      product_category: productCategory,
    };

    setProduct(productData);
    setPendingProducts((pendingProducts) => [...pendingProducts, { product: productData }])
    setProductName('');
    setProductCategory('');
    setProductPrice('');
  };


  //TODO: beim router im backend array abgreifen und dann printen
  // useEffect(() => {
  //   if (product !== '') {
  //     fetch('http://localhost:8080/api/addPendingProduct', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         product: product,
  //       }),
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error('Failed to add pending product');
  //         }
  //         return res.json();
  //       })
  //       .then(() => {
  //         setPendingProducts((pendingProducts) => [...pendingProducts, { product: product }]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [product]);


  const handleRemoveProduct = (index) => {
    setPendingProducts((scannedProducts) => scannedProducts.filter((_, i) => i !== index));
  };


  const handleAddOffer = async () => {

    handleAddPendingProduct();

    const sellerData = {
      seller_name: sellerLastName,
      seller_firstname: sellerFirstName,
      seller_email: sellerEmail,
      seller_phone: sellerPhoneNumber,
    };

    console.log(sellerData)
    setSeller(sellerData)

    setSellerFirstName('');
    setSellerLastName('');
    setSellerEmail('');
    setSellerPhoneNumber('');
    setProductName('');
    setProductCategory('');
    setProductPrice('');
  }

  useEffect(() => {
    if (seller !== '') {
      fetch('http://localhost:8080/api/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: pendingProducts,
          seller: seller,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error);
        });
      setPendingProducts([]);
    }

  }, [seller]);




  // async function sendPendingOffers(){
  //   if (pendingProducts.length > 0) {
  //     try {
  //       const offerPromises = pendingProducts.map(async (pendingProduct) => {
  //         console.log(pendingProduct.product)
  //         console.log(seller)
  //         const response = await fetch('http://localhost:8080/api/offer', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             product: pendingProduct.product,
  //             seller: seller,
  //           }),
  //         });

  //         const data = await response.json();

  //         return data;
  //       });

  //       //const offers = await Promise.all(offerPromises);

  //       // const printResponse = await fetch('http://localhost:8080/api/PrintAllOffers', {
  //       //   method: 'PUT',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify({
  //       //     offers: offers,
  //       //   }),
  //       // });

  //       // Handle the response if needed
  //     } catch (error) {
  //        console.log(error);
  //    }

  //    setPendingProducts([]);
  //   }
  // }

  const scrollRef = useRef(null);

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) { // Überprüfe den Trigger-Wert
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setShouldScrollToBottom(false); // Setze den Trigger zurück, um erneutes Scrollen zu verhindern
    }
  }, [shouldScrollToBottom]);

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

        <div className="rounded border border-ourLightGray bg-white">
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
                <ButtonSmallJustIcon onClick={() => handleAddPendingProduct()} tooltip="Weitere Produkte dieses Verkäufers hinzufügen" icon={<UilPlus />}></ButtonSmallJustIcon>
                <ButtonYellowBorder onClick={() => handleAddOffer()} icon={<UilPrint />} text="Barcodes ausdrucken"></ButtonYellowBorder>
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

        {pendingProducts.length > 0 && (
          <div className="rounded border mt-4 border-ourLightGray bg-white mb-4" style={{ maxHeight: "250px", overflowY: "auto" }}>
            <div className="overflow-hidden">
              <h3 className='px-8 pt-4'>Eingescannte Produkte</h3>
              <table className="min-w-full text-left text-sm font-light rounded">
                <thead className="font-medium">
                  <tr>
                    <th scope="col" className="px-8 py-4">
                      #
                    </th>
                    <th scope="col" className="px-8 py-4">
                      Artikel
                    </th>
                    <th scope="col" className="px-8 py-4">
                      Kategorie
                    </th>
                    <th scope="col" className="px-8 py-4">
                      Preis
                    </th>
                    <th scope="col" className="px-8 py-4">
                      Entfernen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingProducts.map((product, index) => (
                    <Step3TableRow
                      key={index}
                      counter={index + 1}
                      name={product.product.product_name}
                      category={product.product.product_category}
                      price={product.product.product_price}
                      removeItem={() => handleRemoveProduct(index)}
                    />
                  ))}
                  <tr ref={scrollRef}></tr> {/* Empty row for scrolling to the bottom */}

                </tbody>
              </table>
            </div>
          </div>
        )}

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
