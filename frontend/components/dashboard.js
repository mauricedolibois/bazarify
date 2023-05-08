export default function () {
    return (
        <>
            <div>
                <h1>Dashboard</h1>
                <p className="mb-4">Erstelle jetzt einen neuen Basar! Keine Sorge: Wir leiten dich vom ersten Schritt bis ganz zum Schluss! Es ist ganz einfach. Auf der linken Seite findest du den Ablauf. Wir werden dich Schritt für Schritt durch den ganzen Prozess leiten!</p>
                <div class="flex flex-row gap-4">
                    <button class="flex flex-col justify-center rounded-lg bg-yellow-500 px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                        <span class="text-white">Button Text </span>
                    </button>
                    <button class="flex flex-col justify-center rounded-lg border-2 border-yellow-500 px-4 py-2 text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                        <span class="text-yellow-500">Button Text</span>
                    </button>
                </div>
                <h2 className="mt-16">Deine Basare</h2>
                <div class="grid grid-cols-3 gap-4">
                    <div class="rounded border bg-white border-gray-300 px-4 py-2">Skibasar 2023</div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2">Skibasar 2022</div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2">Skibasar 2021</div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2">Skibasar 2020</div>
                    <div class="rounded border bg-white border-gray-300 px-4 py-2">Skibasar 2019</div>
                </div>
            </div>
        </>
    )
}