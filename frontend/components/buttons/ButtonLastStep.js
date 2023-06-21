import { UilAngleLeft } from '@iconscout/react-unicons'
import React, { useContext } from 'react'; // Importiere useContext aus dem 'react'-Modul
import { BazarContext } from '../../pages/index.js'

export default function ({ onClick }) {
    let { step, setStep, currentBazar } = useContext(BazarContext)
    function goToLastStep() {
        if (step == 0) { return }
        setStep(step - 1)
    }
    return (
        <button onClick={goToLastStep} title="Zurück zum letzten Schritt" className="flex items-center justify-center w-10 h-10  cursor-pointer hover:text-ourPrimaryColorHover border border-ourLightGray hover:border-ourPrimaryColorHover text-ourDarkGray rounded-full">
            <span className="flex items-center justify-center">
                <UilAngleLeft />
            </span>
        </button>
    )
}