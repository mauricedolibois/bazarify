import React from 'react'
import UnderlinedInput from './UnderlinedInput'

export default function () {
    return (
        <>
            <div>
                <h1>2. Annahme</h1>
                <p>Jetzt kannst du damit anfangen die Produkte verschiedener Verkäufer hinzuzufügen. Wenn du das erledigt hast, kannst du im nächsten Schritt die Verkäufe einscannen. Das solltest du aber erst machen, wenn alle Produkte eingepflegt sind.</p>
            </div>
            <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ourLightGray py-6 sm:py-12">
                <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                    <div class="rounded border border-ourLightGrey bg-white">
                        <div class="flex flex-row">
                            <div class="w-2/5 border-r border-ourLightGray p-4">

                                <h3>Infos zum Verkäufer</h3>
                                <UnderlinedInput placeholder="Name des Verkäufers" />
                                <UnderlinedInput placeholder="Email des Verkäufers" />
                                <UnderlinedInput placeholder="Telefonnummer des Verkäufers" />
                            </div>
                            <div class="w-3/5 p-4">

                                <h3>Produkte des Verkäufers</h3>
                                <div class="flex flex-row gap-4">
                                    <UnderlinedInput placeholder="Name des Produkts" />
                                    <UnderlinedInput placeholder="Kategorie" />
                                    <UnderlinedInput placeholder="Preis in €" />
                                </div>

                                <div class="mt-4 flex">
                                    <button class="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-ourPrimaryColor px-8 text-white">X</button>
                                    <button class="flex items-center justify-center rounded-lg border border-ourPrimaryColor px-4">
                                        <span class="overflow-hidden truncate whitespace-nowrap text-sm text-ourPrimaryColor">+ Mehr Produkte von diesem Verkäufer hinzufügen</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="border-t border-ourLightGray p-4">

                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center">
                                    <p class="mr-4">ℹ️</p>
                                    <p class="mr-2">Scanne am besten noch 1 Produkt(e) ein, damit du beim Drucken möglichst effizient bist!</p>
                                </div>
                                <button class="flex items-center justify-center rounded-lg border border-ourGreypx-6 py-3">

                                    <span class="whitespace-nowrap text-sm text-ourGrey">Barcodes ausdrucken</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}