import { UilPlay } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilAngleRight } from '@iconscout/react-unicons'
import { useState, useEffect } from 'react'



function BazarCard({ name }) {
const [bazar, setBazar] = useState(undefined)

useEffect(() => {
    if (bazar !== undefined) {
    fetch('http://localhost:8085/api/changeBazar?operator='+name)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBazar(undefined)
        }
        )}
}, [bazar])


    return (
        <div class="border bg-white border-ourLightGray px-4 py-2 rounded-lg flex justify-between">
            {name}
            <UilAngleRight class="inline-block -mr-2 text-ourGray" onClick={()=>setBazar(name)}/>           
        </div>
    )
}

export default function () {
const [bazars, setBazars] = useState(undefined)

useEffect(() => {
    fetch('http://localhost:8085/api/getBazars')
        .then(res => res.json())
        .then(data => {
         setBazars(data)
        }
        )
}, [])

    return (
        <>
            <div>
                <h1>Dashboard</h1>
                <p className="mb-4">Erstelle jetzt einen neuen Basar! Keine Sorge: Wir leiten dich vom ersten Schritt bis ganz zum Schluss! Es ist ganz einfach. Auf der linken Seite findest du den Ablauf. Wir werden dich Schritt für Schritt durch den ganzen Prozess leiten!</p>
                <div class="flex flex-row gap-4">
                    <button class="flex flex-col justify-center rounded-lg bg-ourPrimaryColor px-4 py-2">
                        <UilPlus class="text-white" />
                        <span class="text-white mt-4">Neuen Basar erstellen</span>
                    </button>
                    <button class="flex flex-col justify-center rounded-lg border-2 border-ourPrimaryColor px-4 py-2 text-ourPrimaryColor">
                        <UilPlay class="text-ourPrimaryColor" />
                        <span class="text-ourPrimaryColor mt-4">Tutorial anschauen</span>
                    </button>
                </div>
                <h2 className="mt-16">Deine Basare</h2>

                <div class="grid grid-cols-3 gap-4">
                {console.log(bazars)}
                {(bazars === undefined) ? (<p>Keine Basare vorhanden</p>) : (bazars.map(bazar => {
                        return (bazar.hasOwnProperty('bazar_name')) ? <BazarCard name={bazar.bazar_name} /> : null;
                    }))}
                </div>
            </div>
        </>
    )
}