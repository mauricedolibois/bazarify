import React, { useState, useRef, useEffect } from 'react';
import { UilMultiply, UilCheck, UilArrowRight } from '@iconscout/react-unicons'
import FormInput from './formInput';
import ButtonSmallJustIcon from './buttons/ButtonSmallJustIcon';

const CalculationPopup1 = () => {
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

    const [cashReceived, setCashReceived] = useState('');
    const totalAmount = 50; // Gesamtbetrag der Bestellung, wird aus der Datenbank geholt und berechnet
    const change = cashReceived - totalAmount; // Berechnung des Wechselgelds

    function handleCashCalculation() {
        //TODO: Implement cash calculation
        console.log(cashReceived);
        console.log('Cash calculation done');
    }

    return (
        <div>
            <button onClick={openPopup}>Open Demo Popup</button>
            {isOpen && (
                <div className='fixed w-screen h-screen top-0 left-0 bg-black/75 flex justify-center items-center'>
                    <div className='w-1/2 h-1/2 bg-white rounded-lg relative p-8' ref={popupRef}>
                        <UilMultiply className='absolute top-4 right-4 cursor-pointer' onClick={closePopup} />
                        <h2 className='mb-2'>Wie viel Geld haben Sie erhalten?</h2>
                        <FormInput name="Erhaltenes Geld" unit="€" onChange={e => setCashReceived(e.target.value)}/>
                        <div className='mt-4'>
                        </div>
                        {change > 0 && 
                        <div className='mt-4'>
                            <hr></hr>
                            <p className='mt-4'>Das Wechselgeld beträgt: <span className='font-bold'>{change}€</span>.
                        </p></div>
                        }
                        {change <= 0 && 
                        <div className='mt-4'>
                            <hr></hr>
                            <p className='mt-4'>Aktuell gibt es kein Wechselgeld zurück.
                        </p>
                        </div>
                        }
                        <div className="absolute bottom-4 right-4 cursor-pointer">
                        <ButtonSmallJustIcon onClick={closePopup} icon={<UilArrowRight />}></ButtonSmallJustIcon>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculationPopup1;