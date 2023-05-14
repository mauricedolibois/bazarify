import { UilAngleRight } from '@iconscout/react-unicons'
import { UilApps } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilQuestionCircle } from '@iconscout/react-unicons'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import { BazarContext } from '../pages/index.js'

function Step({ step, text, currentStep }) {
    let stepClass = "text-sm text-ourGray";
    if (step == currentStep) {
        stepClass = "text-sm text-ourPrimaryColor font-bold";
    } else if (step < currentStep) {
        stepClass = "text-sm line-through";
    }

    return (
        <li className="flex items-center">
            <span className={stepClass}>
                {step}. {text}
            </span>
        </li>
    );
}


export default function Sidebar() {

    let { step, setStep, newBazar, setNewBazar, createBazar } = useContext(BazarContext)

    function showDashboard() {
        setStep(0)
    }

    function goToNextStep() {
        // If step < 5 then go to next step and show the text "Nächster Schritt"
        if (step < 5) {
            setStep(step + 1)
        }

        else {
            showDashboard()
            // If step == 5 then go to step 1 and show the text "Basar abschließen"
        }
    }

    function goToStep(step) {
        setStep(step)
    }

    return (
        <>
            <div class="flex h-screen flex-col bg-white min-w-[25%] max-w-md">

                <div class="flex items-center justify-between pt-4">
                    <div class="flex items-center cursor-pointer">
                        <Link onClick={showDashboard} href="/">
                            <span class="pl-4 font-serif text-2xl text-ourPrimaryColor">B</span>
                            <span class="font-serif text-2xl">azarify</span>
                        </Link>
                    </div>
                    <button class="flex items-center pr-4 text-sm text-black">
                        <UilQuestionCircle size="24" />
                    </button>
                </div>


                <div class="flex flex-row items-center justify-center px-4 py-4">
                    <Link href="/template" className='flex-1'>
                        <button class="border-ourGrey text-ourGrey rounded-lg border-2 flex flex-col justify-center px-4 py-2 flex-1">
                            <UilPlus class="" size="24" />
                            <span class="text-ourGrey text-sm mt-4">Neuer Bazar</span>
                        </button>
                    </Link>
                    <button class="border-ourGrey text-ourGrey ml-2 flex flex-col justify-center rounded-lg border-2 px-4 py-2 flex-1">
                        <UilApps class="" size="24" />
                        <span class="text-ourGrey text-sm mt-4">Bazare verwalten</span>
                    </button>
                </div >



                <div class="border-t border-ourLightGray pb-4"></div>

                <h3 class="px-4 py-2 text-lg font-bold text-ourSuperDarkGray">Ablauf</h3>

                <ul class="flex flex-grow flex-col space-y-2 px-4 py-2">
                    <Step step="1" text="Basar erstellen" currentStep={step} />
                    <Step step="2" text="Annahme" currentStep={step} />
                    <Step step="3" text="Verkauf" currentStep={step} />
                    <Step step="4" text="Abholung" currentStep={step} />
                    <Step step="5" text="Analytics und Bilanz" currentStep={step} />
                </ul>


                <div class="mt-auto border-t border-ourLightGray">
                    <button onClick={goToNextStep} class="justify-left flex h-10 w-full items-center pl-4 text-sm text-ourPrimaryColor">
                        <UilAngleRight size="24" />
                        {step === 0 && "Los geht's!"}
                        {(step < 5 && step > 0) && "Nächster Schritt"}
                        {step == 5 && "Basar abschließen"}
                    </button>
                </div>
            </div >
        </>
    )
}