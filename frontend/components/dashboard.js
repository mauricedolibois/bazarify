import { UilPlay } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilAngleRight, UilTrashAlt } from '@iconscout/react-unicons'
import ButtonBigColor from './buttons/ButtonBigColor'
import ButtonBigNoColor from './buttons/ButtonBigNoColor'
import Link from 'next/link'
import { useContext } from 'react'
import { BazarContext } from '../pages/index.js'
import { useState, useEffect } from 'react'

function BazarCard({ name }) {
    let { setCurrentBazar, setStep } = useContext(BazarContext)
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


    const deleteBazar = (event) => {
        event.stopPropagation(); // Prevent event propagation
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
        <div onClick={() => {
            setBazar(name)
            setCurrentBazar(name)
        }} class="border bg-white border-ourLightGray hover:text-ourPrimaryColorHover items-center mt-2 px-4 py-2 cursor-pointer rounded-lg flex justify-between">
            <p title="Basar wechseln" className='text-sm'>{name}</p>
            <div class="flex justify-between">
                <div title="Basar löschen">
                    <UilTrashAlt size="17" class="inline-block -ml-2 hover:text-red-400 text-ourGray" onClick={(event) => { deleteBazar(event) }} />
                </div>
            </div>
        </div>
    )
}

export default function () {

    function loadExampleData() {
        fetch('http://localhost:8080/api/loadExampleData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
        .then(data => {
            window.location.reload()
        })
        .catch(error => console.log(error))
    }

    let { setStep } = useContext(BazarContext)
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
                <p className="mb-4">Willkommen bei Bazarify! Hier kannst du ganz einfach einen neuen Basar erstellen oder einen existierenden Basar auswählen. Keine Sorge, wir führen dich Schritt für Schritt durch den gesamten Prozess, damit dieser dein einfachster Basar bisher wird!</p>
                <div class="flex flex-row gap-4">
                    {/* Sollen wir das hier lieber mit dem Stepper machen (so wie in der Sidebar, also onClick={showDashboard}) oder mit href? */}
                    <Link href="/" onClick={() => setStep(1)}>
                        <ButtonBigColor text="Neuen Basar erstellen" icon={<UilPlus />}></ButtonBigColor>
                    </Link>
                    <Link href="https://www.youtube.com/watch?v=EngW7tLk6R8" target='_blank'>
                        <ButtonBigNoColor text="Tutorial anschauen" icon={<UilPlay />}>
                        </ButtonBigNoColor>
                    </Link>
                    <Link href="/" onClick={() => loadExampleData()}>
                        <ButtonBigNoColor text="Demonstration laden" icon={<UilPlay />}></ButtonBigNoColor>
                    </Link>
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
