import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply, UilCalculator, UilArrowRight } from '@iconscout/react-unicons';
import FormInput from './formInput';
import ButtonSmallJustIcon from './buttons/ButtonSmallJustIcon';

const CalculationPopup = ({ popupOpen, closePopup, totalPrice }) => {
    const [isOpen, setIsOpen] = useState(popupOpen);
    const popupRef = useRef(null);
    const [cashReceived, setCashReceived] = useState('');
    const [totalAmount, setTotalAmount] = useState(totalPrice);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closeThePopup = () => {
        setIsOpen(false);
        closePopup()
    };

    useEffect(() => {
        setIsOpen(popupOpen); // Update isOpen state when popupOpen prop changes
    }, [popupOpen]);

    useEffect(() => {
        setTotalAmount(totalPrice);
    }, [totalPrice]);

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
        console.log("In CalculationPopup totalPrice: " + totalPrice)
        console.log("In CalculationPopup totalAmount: " + totalAmount)
        const change = parseFloat(cashReceived.replace(',', '.')) - totalAmount;
        return change > 0 ? change : 0;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed w-screen h-screen top-0 left-0 bg-black/75 flex justify-center z-50 items-center">
                    <div className="w-1/2 h-1/2 bg-white rounded-lg relative p-8" ref={popupRef}>
                        {//<UilMultiply className="absolute top-4 right-4 cursor-pointer" onClick={closeThePopup} />
                        }
                        <h2 className="mb-2">Wie viel Geld haben Sie erhalten?</h2>
                        <FormInput
                            name="Erhaltenes Geld"
                            unit="€"
                            onChange={(e) => {
                                setCashReceived(e.target.value.replace(',', '.'));
                            }}
                        />
                        <div className="mt-4">
                            {cashReceived && (
                                <>
                                    <hr className="text-ourGray" />
                                    {calculateChange() > 0 ? (
                                        <p className="mt-4">
                                            Das Wechselgeld beträgt: <span className="font-bold">{formatCurrency(calculateChange())}</span>.
                                        </p>
                                    ) : (
                                        <p className="mt-4">Aktuell gibt es kein Wechselgeld zurück.</p>
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
