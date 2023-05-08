export default function () {
    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <button class="flex flex-col justify-center rounded-lg bg-yellow-500 px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <span class="text-sm text-white">Button Text </span>
                </button>
                <h2>Infos zum Verkäufer finden</h2>

                <div class="relative overflow-x-auto">
                    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Product name</th>
                                <th scope="col" class="px-6 py-3">Color</th>
                                <th scope="col" class="px-6 py-3">Category</th>
                                <th scope="col" class="px-6 py-3">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">Apple MacBook Pro 17"</th>
                                <td class="px-6 py-4">Silver</td>
                                <td class="px-6 py-4">Laptop</td>
                                <td class="px-6 py-4">$2999</td>
                            </tr>
                            <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">Microsoft Surface Pro</th>
                                <td class="px-6 py-4">White</td>
                                <td class="px-6 py-4">Laptop PC</td>
                                <td class="px-6 py-4">$1999</td>
                            </tr>
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">Magic Mouse 2</th>
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