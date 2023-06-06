import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply } from '@iconscout/react-unicons'

import ButtonGrayBorder from './buttons/ButtonGrayBorder';
import { UilKeyboard } from '@iconscout/react-unicons'
import FormInput from './formInput';
import ButtonSmallJustIcon from './buttons/ButtonSmallJustIcon';
import { UilCheck } from '@iconscout/react-unicons'

const AddProductsManuallyPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [barcode, setBarcode] = useState('');
    const popupRef = useRef(null);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const searchForOffer = () => {
        setBarcode(document.getElementById("Barcode des Produkts").value)
        setIsOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //fetch offer from database
  const operator = "offer_id"
  const link = 'http://localhost:8080/api/offer?operator='+[operator]+'&parameter='+barcode
  console.log(link)
  useEffect(() => {
    if (barcode !== '') {
    fetch(link, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
    }
  }, [barcode])//barcode == offer_id 




    return (
        <div>
            {/*Alt: <button onClick={openPopup}>Open Popup</button>*/}
            <div onClick={openPopup} className='inline-block'>
                <ButtonGrayBorder text="Produkte manuell eintragen" icon={<UilKeyboard />}></ButtonGrayBorder>
            </div>
            {isOpen && (
                <div className='fixed w-screen h-screen top-0 left-0 bg-black/75 flex justify-center items-center'>
                    <div className='w-1/2 h-1/2 bg-white rounded-lg relative p-8' ref={popupRef}>
                        <UilMultiply className='absolute top-4 right-4 cursor-pointer' onClick={closePopup} />
                        <h2>Produkte manuell eintragen</h2>
                        <FormInput name="Barcode des Produkts"/>
                        <div onClick={searchForOffer}>
                            <ButtonSmallJustIcon icon={<UilCheck />}></ButtonSmallJustIcon>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductsManuallyPopup;