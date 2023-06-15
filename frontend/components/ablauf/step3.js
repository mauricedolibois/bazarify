import { UilTrash } from '@iconscout/react-unicons';
import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import ButtonGrayBorder from '../buttons/ButtonGrayBorder';
import { UilCheck, UilKeyboard, UilCalculator, UilInfoCircle } from '@iconscout/react-unicons';
import NewProductInput from '../NewProductInput';
import CalculationPopup from '../CalculationPopup';
import UnderlindedInput from '../underlinedInput';
import { useState, useEffect } from 'react';
import Step3TableRow from '../step3TableRow';

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
    const [updatedOffer, setUpdatedOffer] = useState('');

    let input;

    const handleScan = () => {
        input = document.getElementById('Barcode des Produkts');
        if (input.value.trim() !== '') {
            console.log('Enter pressed');
            setBarcode(input.value);
            input.value = '';
        } else {
            console.log('Input is empty');
            // Display an error message or prevent scanning
        }
    };

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
    useEffect(() => {
        if (offer !== '') {
            const productExists = scannedProducts.some((product) => product.product_id === offer.product_id);
            //if (!productExists) {
            fetch('http://localhost:8080/api/product?operator=product_id&parameter=' + offer.product_id, { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    setScannedProducts((scannedProducts) => [...scannedProducts, data]);
                    setAllOffers((allOffers) => [...allOffers, offer]);
                    console.log(scannedProducts);
                    console.log(data);
                })
                .catch((error) => console.log(error));
            // }
        }
    }, [offer]);

    const handleRemoveProduct = (index) => {
        setScannedProducts((scannedProducts) => scannedProducts.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        console.log('submit');
        //update offer status to sold
        allOffers.forEach((offer) => {
            const updatedOffer = {
                ...offer,
                state: 'sold',
            };
            console.log('all offers: ', allOffers);
            console.log('updated offer: ', updatedOffer);
            setUpdatedOffer(updatedOffer);
        });
    };

    //update offer status to sold in db
    useEffect(() => {
        if (updatedOffer !== '') {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOffer),
            };
            fetch('http://localhost:8080/api/offer?operator=offer_id&parameter=' + updatedOffer.offer_id, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        }
    }, [updatedOffer]);

    const totalPrice = scannedProducts.reduce((total, product) => total + product.product_price, 0);

    return (
        <>
            <h1>3. Verkauf</h1>
            <p>
                Klasse! Du solltest jetzt alle Produkte eingetragen haben. Ab jetzt kannst du die Verkäufe abrechnen.
                Scanne dafür einfach die Codes der Produkte ein, welche ein Kunde kaufen möchte. Wenn du alle Verkäufe
                eingescannt hast, kannst du weiter zum nächsten Schritt.
            </p>
            <div className="rounded border border-ourLightGrey bg-white my-8">
                <div className="flex flex-col">
                    <div className="overflow-x-auto max-h-64">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light rounded">
                                    <thead className="border-b font-medium dark:border-neutral-500">
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
                                    <tbody className="">
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row justify-between px-4 py-4 mb-8 gap-32 border-ourLightGray border bg-white rounded ">
                    <UnderlindedInput id="Barcode des Produkts" placeholder="Barcode des Produkts" autoFocus></UnderlindedInput>
                    <div className="flex flex-row items-center">
                        <UilInfoCircle className="mr-4 text-ourDarkGray"></UilInfoCircle>
                        <p className="mr-2 text-sm">
                            Klicke das Eingabefeld an und scanne den Barcode des Produkts ein. Alternativ kannst du ihn
                            auch eintippen.
                        </p>
                    </div>
                </div>
            </div>
            <h2>Gesamt: {totalPrice}€</h2>
            <hr className="border-ourLightGray"></hr>
            <div className="mt-4 gap-4 flex">
                <ButtonSmallJustIcon icon={<UilCheck />} onClick={handleSubmit}></ButtonSmallJustIcon>
                <CalculationPopup></CalculationPopup>
            </div>
        </>
    );
}