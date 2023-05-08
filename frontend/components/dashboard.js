import { UilPlay } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilAngleRight } from '@iconscout/react-unicons'

export default function () {
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
                    <div class="rounded border bg-white border-gray-300 px-4 py-2 flex justify-between">
                        Skibasar 2023
                        <UilAngleRight class="inline-block -mr-2 text-ourGray" />
                    </div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2 flex justify-between">
                        Skibasar 2022
                        <UilAngleRight class="inline-block -mr-2 text-ourGray" />
                    </div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2 flex justify-between">
                        Skibasar 2021
                        <UilAngleRight class="inline-block -mr-2 text-ourGray" />
                    </div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2 flex justify-between">
                        Skibasar 2020
                        <UilAngleRight class="inline-block -mr-2 text-ourGray" />
                    </div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2 flex justify-between">
                        Skibasar 2019
                        <UilAngleRight class="inline-block -mr-2 text-ourGray" />
                    </div>
                </div>
            </div>
        </>
    )
}