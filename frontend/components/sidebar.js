import { UilAngleRight } from '@iconscout/react-unicons'
import { UilApps } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import { UilQuestionCircle } from '@iconscout/react-unicons'

export default function () {
    return (
        <>
            <div class="flex h-screen flex-col bg-white min-w-[25%] max-w-md">

                <div class="flex items-center justify-between pt-4">
                    <div class="flex items-center cursor-pointer">
                        <span class="pl-4 font-serif text-2xl text-ourPrimaryColor">B</span>
                        <span class="font-serif text-2xl">azarify</span>
                    </div>
                    <button class="flex items-center pr-4 text-sm text-black">
                        <UilQuestionCircle size="24" />
                    </button>
                </div>


                <div class="flex flex-row items-center justify-center px-4 py-4">
                    <button class="border-ourGrey text-ourGrey flex flex-col justify-center rounded-lg border-2 px-4 py-2 flex-1">
                        <UilPlus class="" size="24" />
                        <span class="text-ourGrey text-sm mt-4">Neuer Bazar</span>
                    </button>
                    <button class="border-ourGrey text-ourGrey ml-2 flex flex-col justify-center rounded-lg border-2 px-4 py-2 flex-1">
                        <UilApps class="" size="24" />
                        <span class="text-ourGrey text-sm mt-4">Bazare verwalten</span>
                    </button>
                </div>



                <div class="border-t border-ourLightGray pb-4"></div>

                <h3 class="px-4 py-2 text-lg font-bold text-ourSuperDarkGray">Name des Basars</h3>

                <ul class="flex flex-grow flex-col space-y-2 px-4 py-2">
                    <li class="flex items-center line-through cursor-pointer">
                        <span class="text-sm">1. Basar erstellen</span>
                    </li>
                    <li class="flex items-center">
                        <div class="relative flex items-center">
                            <div class="left-0 -ml-6 h-4 w-4 rounded-full bg-ourPrimaryColor">
                                <div class="h-full w-full -translate-x-1/2 transform bg-white"></div>
                            </div>
                            <p class="text-sm font-bold ml-2 text-ourPrimaryColor">2. Annahme</p>
                        </div>
                    </li>
                    <li class="flex items-center">
                        <span class="text-sm text-ourGray">3. Verkauf</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-sm text-ourGrey">4. Abholung</span>
                    </li>
                    <li class="flex items-center">
                        <span class="text-sm text-ourGrey">5. Analytics und Bilanz</span>
                    </li>
                </ul>


                <div class="mt-auto border-t border-ourLightGray">
                    <button class="justify-left flex h-10 w-full items-center pl-4 text-sm text-ourPrimaryColor">
                        <UilAngleRight size="24" />
                        Nächster Schritt
                    </button>
                </div>
            </div>
        </>
    )
}