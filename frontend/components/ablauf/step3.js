import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import { UilCheck, UilInfoCircle, UilEnter } from '@iconscout/react-unicons';
import CalculationPopup from '../CalculationPopup';
import { useState, useEffect, useRef } from 'react';
import Step3TableRow from '../Step3TableRow';
import ButtonYellowBorder from '../buttons/ButtonYellowBorder';
import ProductTable from '../productTable';


//TODO: check if input is a number
//TODO: check if offer exists in database
//TODO: autofocus on input field
//TODO: increase width of input field
//TODO: add error message for invalid input
//TODO: display info when there's no product scanned yet

export default function () {
    const [barcode, setBarcode] = useState('');
    const [offer, setOffer] = useState('');
    const [scannedProducts, setScannedProducts] = useState([]);
    const [allOffers, setAllOffers] = useState([]);
    const [allUpdatedOffers, setAllUpdatedOffer] = useState('');
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
    const [popupOpened, setPopupOpened] = useState(false);

    let input;
    let tmpAllUpdatedOffers = [];
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const closePopup = () => {
        setPopupOpened(false);
        // Callback
    };

    const handleScan = () => {
        input = document.getElementById('Barcode des Produkts');
        const inputValue = input.value.trim();

        if (inputValue !== '') {
            if (!isNaN(inputValue)) {
                console.log('Enter pressed');
                setBarcode(inputValue);
                input.value = '';
            } else {
                console.log('Invalid input: not a number');
                // Display an error message or prevent scanning
                input.value = '';
            }
        } else {
            console.log('Input is empty');
            // Display an error message or prevent scanning
        }
    };

    const handleRemoveProduct = (index) => {
        setScannedProducts((scannedProducts) => scannedProducts.filter((_, i) => i !== index));
    };

    //const totalPrice = scannedProducts.reduce((total, product) => total + product.product_price, 0);
    const [totalPrice, setTotalPrice] = useState(scannedProducts.reduce((total, product) => total + product.product_price, 0));


    // Use Effect hook to always refresh the totalPrice whenever a new product is added to the scannedProducts array
    useEffect(() => {
        setTotalPrice(scannedProducts.reduce((total, product) => total + product.product_price, 0));
    }, [scannedProducts, popupOpened]);

    const getFinalTotalPrice = () => {
        return totalPrice;
    }

    //handle enter key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleScan();
            }
        };

        input = document.getElementById('Barcode des Produkts');
        input.addEventListener('keydown', handleKeyDown);
        console.log('useEffect triggered');

        return () => {
            input.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array ensures the effect runs only once

    //fetch offer from database
    useEffect(() => {
        if (barcode !== '') {
            fetch('http://localhost:8080/api/offer?operator=offer_id&parameter=' + barcode, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setOffer(data);
                    setBarcode('');
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [barcode]); //barcode == offer_id

    //fetch product from database
    //fetch product from database
    useEffect(() => {
        if (offer !== '') {
            // Check if product is already scanned
            const productExists = scannedProducts.some((product) => product.product_id === offer.product_id);
            // Check if product is already sold
            const productAllreadySold =  offer.state === 'sold';
            // Check if product is already reclined
            const productAllreadyReclined = offer.state === 'reclined';
          
            switch (true) {
              case productExists: 
                console.log('Product already scanned');
                break;
              case productAllreadySold:
                console.log('Product already sold');
                break;
              case productAllreadyReclined:
                console.log('Product already reclined');
                break;
              default:
                fetch('http://localhost:8080/api/product?operator=product_id&parameter=' + offer.product_id, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                  setScannedProducts((scannedProducts) => [...scannedProducts, data]);
                  setShouldScrollToBottom(true);
                  setAllOffers((allOffers) => [...allOffers, offer]);
                  console.log(scannedProducts);
                  console.log(data);
                })
                .catch((error) => console.log(error));
                break;
            }
          }
        }, [offer]);
          

    const handleSubmit = () => {
        console.log('submit');
        //update offer status to sold
        allOffers.forEach((offer) => {
            const updatedOffer = {
                ...offer,
                state: 'sold',
            };
            tmpAllUpdatedOffers.push(updatedOffer);
            console.log('all offers: ', allOffers);
            console.log('updated offer: ', updatedOffer);
            setAllUpdatedOffer(tmpAllUpdatedOffers);
        });

        //open popup
        setPopupOpened(true);

        // Reset table to show no products
        setScannedProducts([]);
        setAllOffers([]);

        console.log("TotalPrice" + totalPrice)

    };

    //update offer status to sold in db
    useEffect(() => {
        if (allUpdatedOffers !== '') {
            allUpdatedOffers.forEach((offer) => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(offer),
                };
                fetch('http://localhost:8080/api/offer?operator=offer_id&parameter=' + offer.offer_id, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => console.log(error));
            });

        }
    }, [allUpdatedOffers]);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (shouldScrollToBottom && scrollRef.current) { // Überprüfe den Trigger-Wert
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            setShouldScrollToBottom(false); // Setze den Trigger zurück, um erneutes Scrollen zu verhindern
        }
    }, [shouldScrollToBottom]);

    return (
        <>
            <h1>3. Verkauf</h1>
            <p className='mb-4'>
                Klasse! Du solltest jetzt alle Produkte eingetragen haben. Ab jetzt kannst du die Verkäufe abrechnen.
                Scanne dafür einfach die Codes der Produkte ein, welche ein Kunde kaufen möchte. Alternativ kannst du sie auch eintippen. Wenn du alle Verkäufe
                eingescannt hast, kannst du weiter zum nächsten Schritt.
            </p>
            <div className='border-ourLightGray border bg-white rounded mb-8'>
                <div className="flex flex-row justify-between px-8 py-4 gap-8">
                    <input
                        className="w-full truncate border-b border-ourLightGray text-ourDarkGray focus:border-ourPrimaryColor focus:outline-none"
                        name="name"
                        id="Barcode des Produkts"
                        type="text"
                        ref={inputRef}
                        placeholder="Barcode des Produkts"
                    />
                    <div className='flex flex-row gap-4'>
                        <ButtonSmallJustIcon icon={<UilEnter></UilEnter>} onClick={() => handleScan()}></ButtonSmallJustIcon>



                    </div>

                </div>

            </div >
            {//TODO: Tabelle als Komponente auslagern
            }
            
            <div className="rounded border border-ourLightGray bg-white mb-8 h-80 overflow-y-auto">
                <div className="overflow-hidden">
                    {scannedProducts.length === 0 ? (
                    <div className="flex flex-col justify-center items-center mb-32 mt-32">
                        <UilInfoCircle className="text-ourGray text-4xl mb-4"></UilInfoCircle>
                        <p className="text-ourGray text-xl">Hier werden deine gescannten Produkte angezeigt!</p>
                    </div>
                    ) : (
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
                        {scannedProducts.map((product, index) => (
                            <Step3TableRow
                            key={index}
                            counter={index + 1}
                            name={product.product_name}
                            category={product.product_category}
                            price={product.product_price}
                            removeItem={() => handleRemoveProduct(index)}
                            />
                        ))}
                        <tr ref={scrollRef}></tr> {/* Empty row for scrolling to the bottom */}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>

            

            <h2>Gesamt: {totalPrice}€</h2>
            <hr className="border-ourLightGray"></hr>
            <div className="mt-4 gap-4 flex">
                <ButtonYellowBorder icon={<UilCheck />} text="Verkauf abschließen" onClick={handleSubmit}></ButtonYellowBorder>
                {popupOpened &&
                    <>
                        <CalculationPopup popupOpen={popupOpened} closePopup={closePopup} getFinalTotalPrice={getFinalTotalPrice}></CalculationPopup>
                    </>
                }
            </div>
        </>
    );
}

