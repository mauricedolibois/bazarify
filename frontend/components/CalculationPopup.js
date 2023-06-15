import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply, UilCalculator, UilArrowRight } from '@iconscout/react-unicons';
import FormInput from './formInput';
import ButtonSmallJustIcon from './buttons/ButtonSmallJustIcon';

const CalculationPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const [cashReceived, setCashReceived] = useState('');
    const totalAmount = 50; // Hier muss der Wert dynamisch gesetzt werden

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

    const calculateChange = () => {
        const change = cashReceived - totalAmount;
        return change > 0 ? change : 0;
    };

    return (
        <div>
            <div
                onClick={openPopup}
                className="inline-flex items-center justify-center align-start px-4 py-2 border text-ourDarkGray border-ourGray cursor-pointer hover:text-black hover:border-black rounded-lg"
            >
                <span>
                    <UilCalculator />
                </span>
                <p className="whitespace-nowrap ml-1 text-sm">Rückgeld berechnen</p>
            </div>
            {isOpen && (
                <div className="fixed w-screen h-screen top-0 left-0 bg-black/75 flex justify-center items-center">
                    <div className="w-1/2 h-1/2 bg-white rounded-lg relative p-8" ref={popupRef}>
                        <UilMultiply className="absolute top-4 right-4 cursor-pointer" onClick={closePopup} />
                        <h2 className="mb-2">Wie viel Geld haben Sie erhalten?</h2>
                        <FormInput name="Erhaltenes Geld" unit="€" onChange={e => setCashReceived(e.target.value)} />
                        <div className="mt-4">

                            {cashReceived && (
                                <>
                                    {calculateChange() > 0 ? (
                                        <>
                                            <hr className="text-ourGray"></hr>
                                            <p className="mt-4">
                                                Das Wechselgeld beträgt: <span className="font-bold">{calculateChange()}€</span>.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <hr className="text-ourGray"></hr>
                                            <p className="mt-4">Aktuell gibt es kein Wechselgeld zurück.</p>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="absolute bottom-4 right-4 cursor-pointer">
                            <ButtonSmallJustIcon onClick={closePopup} icon={<UilArrowRight />} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculationPopup;
