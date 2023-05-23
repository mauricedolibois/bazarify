import React, { useState, useEffect } from 'react'
import UnsoldProductsTableCell from '../UnsoldProductsTableCell'

export default function () {

    const [allSales, setAllSales] = useState([]);

    //Get all sales
    useEffect(() => {
        fetch('http://localhost:8085/api/sale', {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllSales(data)
                console.log("data: " + data)
                console.log("All Sales: " + allSales)
            })
            .catch(error => console.log(error))
    }, []) 

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
                              <UnsoldProductsTableCell product_id={7590713979} customer_id={25614} />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
