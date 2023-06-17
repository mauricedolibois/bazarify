import { UilAngleRight } from '@iconscout/react-unicons'
import React, { useContext } from 'react'; // Importiere useContext aus dem 'react'-Modul
import { BazarContext } from '../../pages/index.js'

export default function ({ onClick }) {
    let { step, setStep, currentBazar } = useContext(BazarContext)
    function goToNextStep() {
        if (step < 5) {
            setStep(step + 1)
        }

        else {
            setStep(0)
        }
    }

    return (
        <button onClick={goToNextStep} title="Weiter zum nächsten Schritt" className="flex items-center justify-center w-10 h-10 bg-ourPrimaryColor cursor-pointer hover:bg-ourPrimaryColorHover text-white rounded-full">
            <span className="flex items-center justify-center">
                <UilAngleRight />
            </span>
        </button>
    )
}