import React, { useState, useContext, useEffect } from 'react'
import FormInput from '../formInput'
import { UilPlus } from '@iconscout/react-unicons'
import ButtonBigColor from '../buttons/ButtonBigColor'
import { UilAngleRight } from '@iconscout/react-unicons'
import { BazarContext } from '../../pages/index.js'


export default function () {
    const [bazarName, setBazarName] = useState('');
    const [bazarYear, setBazarYear] = useState('');
    const [bazarCommission, setBazarCommission] = useState('');
    const [bazarDescription, setBazarDescription] = useState(' ');
    const [bazar, setBazar] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let {setStep, setCurrentBazar } = useContext(BazarContext)

    const handleAddBazar = () => {
        const bazar = {
            bazar_name: bazarName,
            bazar_year: bazarYear,
            bazar_commission: bazarCommission,
            bazar_description: bazarDescription
        };

        console.log(bazar);
        setBazar(bazar);

        //clear fields
        setBazarName('');
        setBazarYear('');
        setBazarCommission('');
        setBazarDescription('');
    }

    useEffect(() => {
        if (bazar !== '') {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bazar)
            };
            fetch('http://127.0.0.1:8080/api/newBazar', requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (typeof data === 'object' && data !== null) {
                        setStep(2);
                        setCurrentBazar(bazar.bazar_name);
                    }
                    else {
                        //TODO: specific error message
                        setErrorMessage("Es ist ein Fehler bei der Eingabe aufgetreten. Bitte überprüfe deine Eingaben!");
                    }
                })
                .catch(error => {
                    setErrorMessage('Es ist ein Fehler bei der Eingabe aufgetreten. Bitte versuche es erneut!')
                    console.log(error)
                })
        }
    }, [bazar])

    return (
        <>
            <div>
                <h1>1. Basar erstellen</h1>
                <p>Als erstes sollten wir ein paar generelle Infos zu deinem anstehenden Basar festhalten. Fülle einfach die vorgefertigen Felder aus!</p>
            </div>
            <div>
                <div>
                    <div className="flex justify-between gap-4">
                        <FormInput
                            name="Name des Basars"
                            value={bazarName}
                            onChange={(e) => setBazarName(e.target.value)}
                        />
                        <FormInput
                            name="Jahr"
                            value={bazarYear}
                            onChange={(e) => setBazarYear(e.target.value)}
                        />
                        <FormInput
                            name="Provision"
                            unit="%"
                            value={bazarCommission}
                            onChange={(e) => setBazarCommission(e.target.value)}
                        />
                    </div>
                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-ourSuperDarkGray mt-4">Beschreibung</label>
                        <div class="mt-2">
                            <textarea placeholder="Eine kurze optionale Beschreibung des geplanten Basars" id="about" name="about" rows="3" class="block focus:outline-ourPrimaryColor w-full rounded-md border-0 px-2 py-1.5 text-ourSuperDarkGray shadow-sm ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" onChange={(e) => setBazarDescription(e.target.value)}></textarea>

                        </div>
                    </div>
                </div>
                <p className="mt-4 text-sm text-red-400 text-left">{errorMessage}</p>



                <div id="scrollManager" className="fixed bottom-8 right-16 flex items-center justify-end gap-x-6 z-40">
                    <button type='submit' onClick={() => handleAddBazar()} title="Weiter zum nächsten Schritt" className="flex items-center justify-center w-10 h-10 bg-ourPrimaryColor  cursor-pointer hover:bg-ourPrimaryColorHover text-white rounded-full">
                        <span className="flex items-center justify-center">
                            <UilAngleRight />
                        </span>

                    </button>
                </div>
            </div>
        </>
    )
}