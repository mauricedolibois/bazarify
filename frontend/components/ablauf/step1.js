import React, { useState, useEffect } from 'react'
import FormInput from '../formInput'

import { UilPlus } from '@iconscout/react-unicons'
import ButtonBigColor from '../buttons/ButtonBigColor'


import { useContext } from 'react'
import { BazarContext } from '@/pages'


export default function () {
    let { step, setStep, newBazar, setNewBazar, createBazar } = useContext(BazarContext)
    const [bazarName, setBazarName] = useState('');
    const [bazarYear, setBazarYear] = useState('');
    const [bazarCommission, setBazarCommission] = useState('');
    const [bazarDescription, setBazarDescription] = useState(' ');
    const [bazar, setBazar] = useState('');

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

        //go to next step
        //setStep(2);
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
                    if (data) {
                        //go to next step
                        console.log(data)
                    }
                })
                .catch(error => console.log(error))
        }
    }, [bazar])

    return (
        <>

            {//<ButtonBigColor text="ButtonBigColor" icon={<UilPlus />}></ButtonBigColor>
            }




            <div>
                <h1>1. Basar erstellen</h1>
                <p>Als erstes sollten wir ein paar generelle Infos zu deinem anstehenden Basar festhalten. Fülle einfach die vorgefertigen Felder aus!</p>
            </div>
            <div>
                <div class="grid grid-cols-1 gap-x-8 sm:grid-cols-6">
                    <FormInput name="Name des Basars" onChange={(e) => setBazarName(e.target.value)} />
                    <FormInput name="Jahr" onChange={(e) => setBazarYear(e.target.value)} />
                    <FormInput name="Provision" unit="%" onChange={(e) => setBazarCommission(e.target.value)} />

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-ourSuperDarkGray mt-4">Beschreibung</label>
                        <div class="mt-2">
                            <textarea placeholder="Eine kurze optionale Beschreibung des geplanten Basars" id="about" name="about" rows="3" class="block w-full rounded-md border-0 px-2 py-1.5 text-ourSuperDarkGray shadow-sm ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" onChange={(e) => setBazarDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => setStep(0)} class="text-sm font-semibold leading-6  hover:text-ourSuperDarkGray text-ourDarkGray">Abbrechen</button>
                    <button type="submit" onClick={() => handleAddBazar()} class="rounded-md bg-ourPrimaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ourPrimaryColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Speichern</button>
                </div>
            </div>

        </>
    )
}