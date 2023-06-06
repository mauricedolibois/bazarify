import { UilTrash } from '@iconscout/react-unicons'
import ButtonSmallJustIcon from '../buttons/ButtonSmallJustIcon';
import ButtonGrayBorder from '../buttons/ButtonGrayBorder';
import { UilCheck, UilKeyboard, UilCalculator, UilInfoCircle } from '@iconscout/react-unicons'
import NewProductInput from '../NewProductInput';
import CalculationPopup from '../CalculationPopup';

function ShoppingCart() {

    return (<>
        <h1>3. Verkauf</h1>
        <p>
            Klasse! Du solltest jetzt alle Produkte eingetragen haben. Ab jetzt kannst du die Verkäufe abrechnen. Scanne dafür einfach die Codes der Produkte ein, welche ein Kunde kaufen möchte. Wenn du alle Verkäufe eingescannt hast, kannst du weiter zum nächsten Schritt.
        </p>
        <div className="rounded border border-ourLightGrey bg-white my-8">

            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-left text-sm font-light rounded">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" class="px-8 py-4">#</th>
                                        <th scope="col" class="px-8 py-4">Artikel</th>
                                        <th scope="col" class="px-8 py-4">Kategorie</th>
                                        <th scope="col" class="px-8 py-4">Preis</th>
                                        <th scope="col" class="px-8 py-4">Entfernen</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <tr class="border-b dark:border-neutral-500">
                                        <td class="whitespace-nowrap px-8 py-4">1</td>
                                        <td class="whitespace-nowrap px-8 py-4">Olega CS500</td>
                                        <td class="whitespace-nowrap px-8 py-4">Skischuhe</td>
                                        <td class="whitespace-nowrap px-8 py-4">100€</td>
                                        <td class="whitespace-nowrap px-8 py-4"><UilTrash size="16"></UilTrash></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="flex flex-row justify-between px-4 py-4 mb-8 gap-32 border-ourLightGray border bg-white rounded ">
                <NewProductInput placeholder="Barcode einscannen/eintippen"></NewProductInput>
                <div className="flex flex-row items-center">
                    <UilInfoCircle className="mr-4 text-ourDarkGray"></UilInfoCircle>
                    <p className="mr-2 text-sm">
                        Klicke das Eingabefeld an und scanne den Barcode des Produkts ein. Alternativ kannst du ihn auch eintippen.
                    </p>
                </div>
            </div>
        </div >
        <h2>Gesamt: 420€</h2>
        <hr className='border-ourLightGray'></hr>
        <div className="mt-4 gap-4 flex">
            <ButtonSmallJustIcon icon={<UilCheck />}></ButtonSmallJustIcon>
            {/*<ButtonGrayBorder icon={<UilCalculator />} text="Rückgeld berechnen">Weiter</ButtonGrayBorder>
            <ButtonGrayBorder icon={<UilKeyboard />} text="Produkt manuell eintragen"></ButtonGrayBorder>
            */}
            <CalculationPopup></CalculationPopup>
        </div>
    </>)
}

export default ShoppingCart