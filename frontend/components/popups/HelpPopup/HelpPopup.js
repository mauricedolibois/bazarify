import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply, UilQuestionCircle } from '@iconscout/react-unicons'

const PopupTemplate = () => {
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
            <button title="Hilfe" class="flex items-center pr-4 text-sm text-black hover:text-ourPrimaryColor" onClick={openPopup}>
                <UilQuestionCircle size="24" />
            </button>
            {
                isOpen && (
                    <div className='fixed w-screen h-screen top-0 left-0 bg-black/75 flex z-50 justify-center items-center'>
                        <div className='w-1/2 h-1/2 bg-white rounded-lg relative p-8' ref={popupRef}>
                            <UilMultiply className='absolute top-4 right-4 cursor-pointer' onClick={closePopup} />
                            <h1>Hilfe</h1>
                            <p>Wenn Sie Hilfe benötigen melden Sie sich bitte bei Maik Bucher unter mb389@hdm-stuttgart.de. Ansonsten können Sie auch das Tutorial auf dem Dashboard anschauen, in welchem bereits einige Fragen geklärt werden könnten.</p>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default PopupTemplate;