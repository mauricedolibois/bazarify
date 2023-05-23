import { UilPlay } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilAngleRight } from '@iconscout/react-unicons'
import ButtonBigColor from './buttons/ButtonBigColor'
import ButtonBigNoColor from './buttons/ButtonBigNoColor'
import PopupTemplate from './PopupTemplate'
import Link from 'next/link'

import { useContext } from 'react'
import { BazarContext } from '../pages/index.js'


function BazarCard({ name }) {
    return (
        <div class="border bg-white border-ourLightGray px-4 py-2 rounded-lg flex justify-between">
            {name}
            <UilAngleRight class="inline-block -mr-2 text-ourGray" />
        </div>
    )
}

export default function () {
    let { step, setStep, newBazar, setNewBazar, createBazar } = useContext(BazarContext)

    return (
        <>
            <PopupTemplate>Hier</PopupTemplate>
            <div>
                <h1>Dashboard</h1>
                <p className="mb-4">Erstelle jetzt einen neuen Basar! Keine Sorge: Wir leiten dich vom ersten Schritt bis ganz zum Schluss! Es ist ganz einfach. Auf der linken Seite findest du den Ablauf. Wir werden dich Schritt für Schritt durch den ganzen Prozess leiten!</p>
                <div class="flex flex-row gap-4">
                    {/* Sollen wir das hier lieber mit dem Stepper machen (so wie in der Sidebar, also onClick={showDashboard}) oder mit href? */}
                    <Link href="/" onClick={() => setStep(1)}>
                        <ButtonBigColor text="Neuen Basar erstellen" icon={<UilPlus />}></ButtonBigColor>
                    </Link>
                    <ButtonBigNoColor text="Tutorial anschauen" icon={<UilPlay />}></ButtonBigNoColor>
                </div>
                <h2 className="mt-16">Deine Basare</h2>
                <div class="grid grid-cols-3 gap-4">
                    <BazarCard name="Bazar 2023" />
                    <BazarCard name="Bazar 2022" />
                    <BazarCard name="Bazar 2021" />
                    <BazarCard name="Bazar 2020" />
                    <BazarCard name="Bazar 2019" />
                </div>
            </div>
        </>
    )
}