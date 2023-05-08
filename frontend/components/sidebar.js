import { UilAngleRight } from '@iconscout/react-unicons'

export default function () {
    return (
        <>
            <div class="flex h-screen flex-col bg-white min-w-[22.5%] max-w-md">

                <div class="flex items-center justify-between pt-4">
                    <div class="flex items-center cursor-pointer">
                        <span class="pl-4 font-serif text-3xl text-yellow-500">B</span>
                        <span class="font-serif text-3xl">azarify</span>
                    </div>
                    <button class="flex items-center pr-4 text-sm text-gray-600 hover:text-gray-900">ⓘ</button>
                </div>


                <div class="flex flex-row items-center justify-center pb-4 pl-4 pr-4 pt-4">
                    <button class="border-grey-500 text-grey-500 mr-2 flex flex-grow flex-col justify-center rounded-lg border-2 px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                        <span class="text-grey-500 text-sm">Neuer Basar</span>
                    </button>
                    <button class="border-grey-500 text-grey-500 ml-2 flex flex-grow flex-col justify-center rounded-lg border-2 px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                        <span class="text-grey-500 text-sm">Basare verwalten</span>
                    </button>
                </div>


                <div class="border-t border-gray-200 pb-4"></div>

                <h3 class="px-4 py-2 text-lg font-bold text-gray-800">Name des Basars</h3>

                <ul class="flex flex-grow flex-col space-y-2 px-4 py-2">
                    <li class="flex items-center line-through cursor-pointer">
                        <span class="text-sm">1. Basar erstellen</span>
                    </li>
                    <li class="flex items-center">
                        <div class="relative flex items-center">
                            <div class="left-0 -ml-6 h-4 w-4 rounded-full bg-yellow-500">
                                <div class="h-full w-full -translate-x-1/2 transform bg-white"></div>
                            </div>
                            <p class="text-sm font-bold ml-2 text-yellow-500">2. Annahme</p>
                        </div>
                    </li>
                    <li class="flex items-center">
                        <span class="text-sm text-gray-500">3. Verkauf</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-sm text-gray-500">4. Abholung</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-sm text-gray-500">5. Analytics und Bilanz</span>
                    </li>
                </ul>


                <div class="mt-auto border-t border-gray-200">
                    <button class="justify-left flex h-10 w-full items-center pl-4 text-sm text-yellow-500">
                        <UilAngleRight size="24" />
                        Nächster Schritt
                    </button>
                </div>
            </div>
        </>
    )
}