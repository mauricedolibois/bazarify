import SellerInformation from "../SellerInformation"
import SendMailsButton from "../buttons/SendMailsButton"
import ButtonBigColor from "../buttons/ButtonBigColor"
import { UilEnvelopeUpload } from '@iconscout/react-unicons'
import UnderlindedInput from "../UnderlinedInput"
import { useState, useEffect } from 'react'

export default function () {
    const [allSellers, setAllSellers] = useState([])
    const [searchedSeller, setSearchedSeller] = useState([])
    const [allProductsFromSeller, setAllProductsFromSeller] = useState([])
    const [clickedSellerID, setClickedSellerID] = useState(0)
    const [sellerPayback, setSellerPayback] = useState(0)

    //get all sellers
    useEffect(() => {
        fetch('http://localhost:8080/api/allSellers', {method: 'GET'})
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
        
        console.log("search string: ",searchString)
        console.log("all sellers: ",allSellers)
        //search for seller
        allSellers.map(seller => {
            if(seller.seller_name.toLowerCase().includes(searchString) || seller.seller_firstname.toLowerCase().includes(searchString)){
                tmpSearchedSeller.push(seller)
            }
        })
                
        //crop searched seller to 5
        searchedSeller.slice(0,5)
        //set searched seller
        setSearchedSeller(tmpSearchedSeller)
        console.log("searched seller: ",searchedSeller)
    }

    //get all products from seller
    const handleSellerClick = (seller) => {
        console.log("seller clicked: ",seller)
        setClickedSellerID(seller.seller_id)
    }

    useEffect(() => {
        if(clickedSellerID !== 0){
            console.log("clicked seller id: ",clickedSellerID)  
            fetch('http://localhost:8080/api/sellerProducts?seller_id='+clickedSellerID, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
            console.log("products from seller: ",data)
            setAllProductsFromSeller(data)
            calculateSellerPayback(data)
            })
            .catch(error => console.log(error));
        }
    }, [clickedSellerID]);

    const calculateSellerPayback = (products) => {
        let tmpSellerPayback = 0
        products.map(product => {
            if(product.offer_status === "sold"){
                tmpSellerPayback += product.product_price
            }
        })
        setSellerPayback(tmpSellerPayback)
    }


    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <SendMailsButton></SendMailsButton>

                <h2 className="mt-8">Infos zum Verkäufer finden</h2>
                <UnderlindedInput id="sellerSearchBar" placeholder="Verkäufer suchen..." onChange={searchSeller}></UnderlindedInput>
                <div>
                    {searchedSeller.map((seller) => (
                        <div key={seller.id} onClick={() => handleSellerClick(seller)}>
                            <p>{seller.seller_name} {seller.seller_firstname}</p>
                        </div>
                ))}
                </div>
                <div class="relative overflow-x-auto">
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
                <div>
                    <p>Geld zurück: {sellerPayback}</p>
                </div>
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