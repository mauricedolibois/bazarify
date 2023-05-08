export default function () {
    return (
        <>
            <div>
                <h1>2. Annahme</h1>
                <p>Jetzt kannst du damit anfangen die Produkte verschiedener Verkäufer hinzuzufügen. Wenn du das erledigt hast, kannst du im nächsten Schritt die Verkäufe einscannen. Das solltest du aber erst machen, wenn alle Produkte eingepflegt sind.</p>
            </div>
            <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
                    <div class="rounded border border-gray-300 bg-white">
                        <div class="flex flex-row">
                            <div class="w-2/5 border-r border-gray-300 p-4">

                                <h3>Infos zum Verkäufer</h3>
                                <div class="group flex items-center">
                                    <input class="w-full truncate border-b border-gray-300 text-gray-700 focus:border-yellow-500 focus:outline-none" type="text" placeholder="Name des Verkäufers" />
                                </div>
                                <div class="group flex items-center">
                                    <input class="w-full truncate border-b border-gray-300 text-gray-700 focus:border-yellow-500 focus:outline-none" type="text" placeholder="Email des Verkäufers" />
                                </div>
                            </div>
                            <div class="w-3/5 p-4">

                                <h3>Produkte des Verkäufers</h3>
                                <div class="flex flex-row gap-4">
                                    <div class="group flex items-center">
                                        <input class="w-full truncate border-b border-gray-300 text-gray-700 focus:border-yellow-500 focus:outline-none" type="text" placeholder="Name des Produkts" />
                                    </div>
                                    <div class="group flex items-center">
                                        <input class="w-full truncate border-b border-gray-300 text-gray-700 focus:border-yellow-500 focus:outline-none" type="text" placeholder="Kategorie" />
                                    </div>
                                    <div class="group flex items-center">
                                        <input class="w-full truncate border-b border-gray-300 text-gray-700 focus:border-yellow-500 focus:outline-none" type="text" placeholder="Preis in €" />
                                    </div>
                                </div>

                                <div class="mt-4 flex">
                                    <button class="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 px-8 text-white">X</button>
                                    <button class="flex items-center justify-center rounded-lg border border-yellow-500 px-4">
                                        <span class="overflow-hidden truncate whitespace-nowrap text-sm text-yellow-500">+ Mehr Produkte von diesem Verkäufer hinzufügen</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="border-t border-gray-300 p-4">

                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center">
                                    <p class="mr-4">ℹ️</p>
                                    <p class="mr-2">Scanne am besten noch 1 Produkt(e) ein, damit du beim Drucken möglichst effizient bist!</p>
                                </div>
                                <button class="flex items-center justify-center rounded-lg border border-gray-500 px-6 py-3">

                                    <span class="whitespace-nowrap text-sm text-gray-500">Barcodes ausdrucken</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}