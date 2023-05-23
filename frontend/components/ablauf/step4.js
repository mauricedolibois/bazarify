import ButtonBigColor from "../buttons/ButtonBigColor"
import { UilEnvelopeUpload } from '@iconscout/react-unicons'

export default function () {
    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <ButtonBigColor icon={<UilEnvelopeUpload />} text="Verkäufer benachrichtigen" />

                <h2 className="mt-8">Infos zum Verkäufer finden</h2>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-left text-sm text-ourGray dark:text-ourGray">
                        <thead class="bg-ourLightGray text-xs uppercase text-ourDarkGray dark:bg-gray-700 dark:text-ourGray">
                            <tr>
                                <th scope="col" class="px-6 py-3">Product name</th>
                                <th scope="col" class="px-6 py-3">Color</th>
                                <th scope="col" class="px-6 py-3">Category</th>
                                <th scope="col" class="px-6 py-3">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b bg-white dark:border-ourDarkGray dark:bg-ourSuperDarkGray">
                                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-ourSuperDarkGray dark:text-white">Apple MacBook Pro 17"</th>
                                <td class="px-6 py-4">Silver</td>
                                <td class="px-6 py-4">Laptop</td>
                                <td class="px-6 py-4">$2999</td>
                            </tr>
                            <tr class="border-b bg-white dark:border-ourSuperDarkGray dark:bg-ourSuperDarkGray">
                                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-ourSuperDarkGray dark:text-white">Microsoft Surface Pro</th>
                                <td class="px-6 py-4">White</td>
                                <td class="px-6 py-4">Laptop PC</td>
                                <td class="px-6 py-4">$1999</td>
                            </tr>
                            <tr class="bg-white dark:bg-ourDarkGray">
                                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-ourSuperDarkGray dark:text-white">Magic Mouse 2</th>
                                <td class="px-6 py-4">Black</td>
                                <td class="px-6 py-4">Accessories</td>
                                <td class="px-6 py-4">$99</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}