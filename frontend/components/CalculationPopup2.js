import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply } from '@iconscout/react-unicons'
import ButtonSmallJustIcon from './buttons/ButtonSmallJustIcon';
import { UilArrowRight } from '@iconscout/react-unicons'

const CalculationPopup2 = () => {
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
            <button onClick={openPopup}>Open Demo Popup</button>
            {isOpen && (
                <div className='fixed w-screen h-screen top-0 left-0 bg-black/75 flex justify-center items-center'>
                    <div className='w-1/2 h-1/2 bg-white rounded-lg relative p-8' ref={popupRef}>
                        <UilMultiply className='absolute top-4 right-4 cursor-pointer' onClick={closePopup} />
                        <h2>Das Rückgeld beträgt ...</h2>
                        <h3>5.00€</h3>
                        <ButtonSmallJustIcon icon={<UilArrowRight />}></ButtonSmallJustIcon>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculationPopup2;