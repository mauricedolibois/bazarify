import SellerInformation from "../SellerInformation"
import SendMailsButton from "../buttons/SendMailsButton"
import ButtonBigColor from "../buttons/ButtonBigColor"
import ButtonSmallJustIcon from "../buttons/ButtonSmallJustIcon"
import { UilEnvelopeUpload, UilSearch } from '@iconscout/react-unicons'
import UnderlindedInput from "../underlinedInput"
import { useState, useEffect } from 'react'

export default function () {
    const [allSellers, setAllSellers] = useState([])
    const [searchedSeller, setSearchedSeller] = useState([])
    const [allProductsFromSeller, setAllProductsFromSeller] = useState([])
    const [clickedSellerID, setClickedSellerID] = useState(0)
    const [sellerPayback, setSellerPayback] = useState(0)

    //get all sellers
    useEffect(() => {
        fetch('http://localhost:8080/api/allSellers', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllSellers(data)
            })
            .catch(error => console.log(error))
    }, [])

    //search for sellers
    const searchSeller = () => {
        //get input
        const searchBar = document.getElementById("sellerSearchBar")
        const searchString = searchBar.value.toLowerCase()
        let tmpSearchedSeller = []

        console.log("search string: ", searchString)
        console.log("all sellers: ", allSellers)
        //search for seller
        allSellers.map(seller => {
            if (seller.seller_name.toLowerCase().includes(searchString) || seller.seller_firstname.toLowerCase().includes(searchString)) {
                tmpSearchedSeller.push(seller)
            }
        })

        //crop searched seller to 5
        searchedSeller.slice(0, 5)
        //set searched seller
        setSearchedSeller(tmpSearchedSeller)


    }



    //get all products from seller
    const handleSellerClick = (seller) => {
        console.log("seller clicked: ", seller)
        setClickedSellerID(seller.seller_id)
        // Setze den Namen auf den Wert des ersten gesuchten Verkäufers oder auf "John Doe", wenn kein Verkäufer gefunden wurde

        let firstName = seller.seller_name
        let lastName = seller.seller_firstname
        let wholeName = firstName + " " + lastName
        setName(wholeName);


    }

    useEffect(() => {
        if (clickedSellerID !== 0) {
            console.log("clicked seller id: ", clickedSellerID)
            fetch('http://localhost:8080/api/sellerProducts?seller_id=' + clickedSellerID, { method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    console.log("products from seller: ", data)
                    setAllProductsFromSeller(data)
                    calculateSellerPayback(data)
                })
                .catch(error => console.log(error));
        }
    }, [clickedSellerID]);

    const calculateSellerPayback = (products) => {
        let tmpSellerPayback = 0
        products.map(product => {
            if (product.offer_status === "sold") {
                tmpSellerPayback += product.product_price
            }
        })
        setSellerPayback(tmpSellerPayback)
    }

    // Neu importiert; Funktion zum Bestimmen des Texts für den dritten Div-Inhalt basierend auf der Anzahl der nicht verkauften Produkte
    const getUnsoldProductsText = () => {
        if (unsoldProductsCount === 0) {
            return 'Keine nicht verkaufte Produkte vorhanden';
        } else {
            return `${unsoldProductsCount} nicht verkaufte Produkte vorhanden`;
        }
    };

    // Neu importiert
    const [name, setName] = useState('Kein Verkäufer ausgewählt');
    const unsoldProductsCount = 5;

    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <SendMailsButton></SendMailsButton>
                <h2 className="mt-8">Infos zum Verkäufer finden</h2>

                {// Suche
                }
                <div className='flex gap-4'>
                    <div class="">
                        <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="pointer-events-none absolute inset-y-0 left-2 flex items-center"></div>
                            <input type="text" onChange={searchSeller} class="rounded py-2 px-4 text-ourSuperDarkGray placeholder:text-ourGray focus:outline-ourPrimaryColor" id="sellerSearchBar" placeholder="Verkäufer suchen..." />
                            <div>
                                {searchedSeller.map((seller) => (
                                    <div key={seller.id} onClick={() => handleSellerClick(seller)} className="px-4 py-2 cursor-pointer bg-white border border-ourLightGray rounded hover:text-ourPrimaryColorHover">
                                        <p className="text-sm">{seller.seller_name} {seller.seller_firstname}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {//<ButtonSmallJustIcon tooltip="Verkäufer finden" icon={<UilSearch></UilSearch>}></ButtonSmallJustIcon>
                    }
                </div>

                {// Verkäufer-Info
                }
                {allProductsFromSeller.length !== 0 &&
                    <div class="grid grid-cols-3 mt-4 bg-white rounded border-ourLightGray border ">
                        <div class="flex justify-center items-center py-4">
                            <p>{name}</p>
                        </div>
                        <div class="flex justify-center flex-col items-center border-l border-ourLightGray border-r py-4">
                            <p className='font-semibold'>{sellerPayback}€</p>
                            <p className='mt-4'>Erlös</p>
                        </div>
                        <div class="flex justify-between text-center items-center py-4 px-8">
                            <p>{getUnsoldProductsText()}</p>
                        </div>
                    </div>
                }

                {// Tabelle
                }
                {allProductsFromSeller.length !== 0 &&
                    <div class="relative mt-4 overflow-x-auto">
                        <table class="w-full text-left text-sm text-ourGray dark:text-ourGray">
                            <thead class="bg-ourLightGray text-xs uppercase text-ourDarkGray dark:bg-gray-700 dark:text-ourGray">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Product name</th>
                                    <th scope="col" class="px-6 py-3">Category</th>
                                    <th scope="col" class="px-6 py-3">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProductsFromSeller.map((product) => (
                                    <tr class="border-b bg-white dark:border-ourDarkGray dark:bg-ourSuperDarkGray">
                                        <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-ourSuperDarkGray dark:text-white">{product.product_name}</th>
                                        <td class="px-6 py-4">{product.product_category}</td>
                                        <td class="px-6 py-4">{product.product_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

/*
    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <SendMailsButton></SendMailsButton>

                <h2 className="mt-8">Infos zum Verkäufer finden</h2>
                <SellerInformation />
            </div>
        </>
    )
    */