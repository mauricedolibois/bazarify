import React from 'react'
import { UseState, UseEffect } from 'react'
import UnsoldProductsTableCell from '../unsoldProductsTableCell'

export default function () {
    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <button class="flex flex-col justify-center rounded-lg bg-ourPrimaryColor px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mb-4 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <span class="text-sm text-white">Button Text </span>
                </button>
                <h2>Infos zum Verkäufer finden</h2>

                <div class="relative overflow-x-auto">
                    <table class="w-full text-left text-sm text-ourGray dark:text-ourGray">
                        <thead class="bg-ourLightGray text-xs uppercase text-ourDarkGray dark:bg-gray-700 dark:text-ourGray">
                            <tr>
                                <th scope="col" class="px-6 py-3">Product name</th>
                                <th scope="col" class="px-6 py-3">Verkäufer</th>
                                <th scope="col" class="px-6 py-3">Category</th>
                                <th scope="col" class="px-6 py-3">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <UnsoldProductsTableCell product_name="Microsoft Surface Pro" costumer_name="Max Mustermann" product_category="Laptop PC" product_price="$1999" />
                            <UnsoldProductsTableCell product_name="Magic Mouse 2" costumer_name="Max Mustermann" product_category="Accessories" product_price="$99" />
                            <UnsoldProductsTableCell product_name="Magic Keyboard" costumer_name="Max Mustermann" product_category="Accessories" product_price="$149" />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}