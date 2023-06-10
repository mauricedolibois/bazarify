import { UilPlay } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilAngleRight, UilTrashAlt  } from '@iconscout/react-unicons'
import ButtonBigColor from './buttons/ButtonBigColor'
import ButtonBigNoColor from './buttons/ButtonBigNoColor'
import Link from 'next/link'
import { useContext } from 'react'
import { BazarContext } from '../pages/index.js'
import { useState, useEffect } from 'react'


function BazarCard({ name }) {
    let {setCurrentBazar, setStep} = useContext(BazarContext)
    const [bazar, setBazar] = useState(undefined)
    const [bazarToDelete, setBazarToDelete] = useState(undefined)

    useEffect(() => {
        if (bazar !== undefined) {
            fetch('http://localhost:8080/api/changeBazar?operator=' + name)
                .then(res => res.json())
                .then(data => {
                    setBazar(undefined)
                    setStep(2)
                }
                )
        }
    }, [bazar])

    const deleteBazar = () => {
        console.log("clicked")
        setBazarToDelete(name)
    }

    useEffect(() => {
        if (bazarToDelete !== undefined) {
            fetch('http://localhost:8080/api//deleteBazar?operator=' + bazarToDelete, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    setBazarToDelete(undefined)
                    //TODO: reload page und maybe bazar ausklappen können
                    window.location.reload()
                }
                )
        }
    }, [bazarToDelete])

    return (
        <div class="border bg-white border-ourLightGray px-4 py-2 rounded-lg flex justify-between">
            {name}
            <UilTrashAlt class="inline-block -ml-2 text-ourGray" onClick={() => {deleteBazar()}} />
               
            <UilAngleRight class="inline-block -mr-2 text-ourGray" onClick={() => {
                setBazar(name)
                setCurrentBazar(name)
            }} />
        </div>
    )
}

export default function () {
    let {setStep} = useContext(BazarContext)
    const [bazars, setBazars] = useState(undefined)

    useEffect(() => {
        fetch('http://localhost:8080/api/getBazars')
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
                    {/* Sollen wir das hier lieber mit dem Stepper machen (so wie in der Sidebar, also onClick={showDashboard}) oder mit href? */}
                    <Link href="/" onClick={() => setStep(1)}>
                        <ButtonBigColor text="Neuen Basar erstellen" icon={<UilPlus />}></ButtonBigColor>
                    </Link>
                    <ButtonBigNoColor text="Tutorial anschauen" icon={<UilPlay />}></ButtonBigNoColor>
                </div>
                <h2 className="mt-16">Deine Basare</h2>

                <div class="grid grid-cols-3 gap-4">
                    {(bazars === undefined) ? (<p>Keine Basare vorhanden</p>) : (bazars.map(bazar => {
                        return (bazar.hasOwnProperty('bazar_name')) ? <BazarCard name={bazar.bazar_name} /> : null;
                    }))}
                </div>
            </div>
        </>
    )
}