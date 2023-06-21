import { UilApps } from '@iconscout/react-unicons'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { BazarContext } from '../pages/index.js'
import SidebarButton from './buttons/SidebarButton.js'
import HelpPopup from './HelpPopup.js'

function Step({ step, text, currentStep, onClick }) {
    let stepClass = "text-sm text-ourGray";
    if (step == currentStep) {
        stepClass = "text-sm text-ourPrimaryColor font-bold";
    } else if (step < currentStep) {
        stepClass = "text-sm line-through";
    }

    return (
        <li className="flex items-center" >
            <span className={stepClass}>
                {step}. {text}
            </span>
        </li>
    );
}


export default function Sidebar() {

    let { step, setStep, currentBazar } = useContext(BazarContext)

    function showDashboard() {
        setStep(0)
    }

    const [bazar, setBazar] = useState("");

    useEffect(() => {
        setBazar(currentBazar)
    }, [currentBazar])


    return (
        <>
            <div class="flex h-screen flex-col bg-white min-w-[20%] max-w-md border-r border-ourLightGray">

                <div class="flex items-center justify-between pt-4">
                    <div class="flex items-center cursor-pointer">
                        <Link onClick={showDashboard} href="">
                            <span class="pl-4 font-serif text-2xl text-ourPrimaryColor">B</span>
                            <span class="font-serif text-2xl">azarify</span>
                        </Link>
                    </div>
                    <HelpPopup />
                </div>

                <div className="flex flex-row px-4 py-4 gap-4">
                    <Link href="/" onClick={showDashboard} className="w-full">
                        <SidebarButton text="Bazare verwalten" icon={<UilApps />} />
                    </Link>
                </div>



                <div class="border-t border-ourLightGray pb-4"></div>

                <h3 class="px-4 py-2 text-lg font-bold text-ourSuperDarkGray">{step === 0 ? "Ablauf" : bazar}</h3>



                <ul class="flex flex-grow flex-col space-y-2 px-4 py-2">
                    <Step step="1" text="Basar erstellen" currentStep={step} />
                    <Step step="2" text="Annahme" currentStep={step} />
                    <Step step="3" text="Verkauf" currentStep={step} />
                    <Step step="4" text="Abholung" currentStep={step} />
                    <Step step="5" text="Analytics und Bilanz" currentStep={step} />
                </ul>

            </div >

        </>
    )
}