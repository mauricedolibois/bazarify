import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply } from '@iconscout/react-unicons'

import ButtonGrayBorder from './buttons/ButtonGrayBorder';
import { UilKeyboard } from '@iconscout/react-unicons'

const AddProductsManuallyPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
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

    return (
        <div>
            {/*Alt: <button onClick={openPopup}>Open Popup</button>*/}
            <div onClick={openPopup} className='inline-block'>
                <ButtonGrayBorder text="Produkte manuell eintragen" icon={<UilKeyboard />}></ButtonGrayBorder>
            </div>
            {isOpen && (
                <div className='fixed w-screen h-screen top-0 left-0 bg-black/50 flex justify-center items-center'>
                    <div className='w-3/4 h-3/4 bg-white rounded-lg relative p-8' ref={popupRef}>
                        <UilMultiply className='absolute top-4 right-4 cursor-pointer' onClick={closePopup} />
                        <h1>Popup Heading</h1>
                        <p>Inhalte des Popup</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductsManuallyPopup;