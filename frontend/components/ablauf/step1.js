import React, { useState, useEffect } from 'react'
import FormInput from '../FormInput'

import { UilPlus } from '@iconscout/react-unicons'
import ButtonBigColor from '../buttons/ButtonBigColor'


import { useContext } from 'react'
import { BazarContext } from '@/pages'


export default function () {
    let {setStep, setCurrentBazar} = useContext(BazarContext)
    const [bazarName, setBazarName] = useState('');
    const [bazarYear, setBazarYear] = useState('');
    const [bazarCommission, setBazarCommission] = useState('');
    const [bazarDescription, setBazarDescription] = useState(' ');
    const [bazar, setBazar] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
                        else
                        {
                            setErrorMessage(data);
                    }
                })
                .catch(error => 
                    {setErrorMessage('Es ist ein Fehler bei der Eingabe aufgetreten. Bitte versuche es erneut!')
                    console.log(error)})
        }
    }, [bazar])

    return (
        <>

            {//<ButtonBigColor text="ButtonBigColor" icon={<UilPlus />}></ButtonBigColor>
            }




            <div>
                <h1>1. Basar erstellen</h1>
                <p className='mb-4'>Als erstes sollten wir ein paar generelle Infos zu deinem anstehenden Basar festhalten. Fülle einfach die vorgefertigen Felder aus!</p>
            </div>
            <div>
            <p className="mr-2 text-sm text-rose-600 text-left">{errorMessage}</p>
                <div class="grid grid-cols-1 gap-x-8 sm:grid-cols-6">
                    <FormInput name="Name des Basars" value={bazarName} onChange={(e) => setBazarName(e.target.value)} />
                    <FormInput name="Jahr" value={bazarYear} onChange={(e) => setBazarYear(e.target.value)} />
                    <FormInput name="Provision" unit="%" value={bazarCommission} onChange={(e) => setBazarCommission(e.target.value)} />

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-ourSuperDarkGray">Beschreibung</label>
                        <div class="mt-2">
                            <textarea placeholder="Eine kurze optionale Beschreibung des geplanten Basars" id="about" name="about" rows="3" class="block w-full rounded-md border-0 px-2 py-1.5 text-ourSuperDarkGray shadow-sm ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" onChange={(e) => setBazarDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => setStep(0)} class="text-sm font-semibold leading-6 text-ourSuperDarkGray">Cancel</button>
                    <button type="submit" onClick={() => handleAddBazar()} class="rounded-md bg-ourPrimaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ourPrimaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Save</button>
                </div>
            </div>

        </>
    )
}