import React, { useState, useEffect } from 'react';
import { UilCheck, UilInfoCircle, UilEnvelopeUpload, UilSearch } from '@iconscout/react-unicons';
import SellerInformation from "../SellerInformation";
import SendMailsButton from "../buttons/SendMailsButton";
import ButtonBigColor from "../buttons/ButtonBigColor";
import ButtonSmallJustIcon from "../buttons/ButtonSmallJustIcon";
import UnderlindedInput from "../underlinedInput";

export default function AbholungPage() {
    const [allSellers, setAllSellers] = useState([]);
    const [searchedSeller, setSearchedSeller] = useState([]);
    const [allProductsFromSeller, setAllProductsFromSeller] = useState([]);
    const [clickedSellerID, setClickedSellerID] = useState(0);
    const [sellerPayback, setSellerPayback] = useState(0);
    const [name, setName] = useState('Kein Verkäufer ausgewählt');
    const [unsoldProductsCount, setUnsoldProductsCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/allSellers', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllSellers(data);
            })
            .catch(error => console.log(error));
    }, []);

    const searchSeller = () => {
        const searchBar = document.getElementById("sellerSearchBar");
        const searchString = searchBar.value.toLowerCase();
        let tmpSearchedSeller = [];

        console.log("search string: ", searchString);
        console.log("all sellers: ", allSellers);
        allSellers.map(seller => {
            if (seller.seller_name.toLowerCase().includes(searchString) || seller.seller_firstname.toLowerCase().includes(searchString)) {
                tmpSearchedSeller.push(seller);
            }
        });

        setSearchedSeller(tmpSearchedSeller.slice(0, 5));
    };

    const handleSellerClick = (seller) => {
        console.log("seller clicked: ", seller);
        setClickedSellerID(seller.seller_id);
        let firstName = seller.seller_name;
        let lastName = seller.seller_firstname;
        let wholeName = firstName + " " + lastName;
        setName(wholeName);
        setSearchedSeller([]);
    };

    useEffect(() => {
        if (clickedSellerID !== 0) {
            console.log("clicked seller id: ", clickedSellerID);
            fetch('http://localhost:8080/api/sellerProducts?seller_id=' + clickedSellerID, { method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    console.log("products from seller: ", data);
                    setAllProductsFromSeller(data);
                    calculateSellerPayback(data);
                })
                .catch(error => console.log(error));
        }
    }, [clickedSellerID]);

    const calculateSellerPayback = (products) => {
        let tmpSellerPayback = 0;
        products.map(product => {
            if (product.offer_status === "sold") {
                tmpSellerPayback += product.product_price;
            }
        });
        setSellerPayback(tmpSellerPayback);
    };

    const getUnsoldProductsText = () => {
        if (unsoldProductsCount === 0) {
            return 'Keine nicht verkaufte Produkte vorhanden';
        } else {
            return `${unsoldProductsCount} nicht verkaufte Produkte vorhanden`;
        }
    };

    function setStatusToPickedUp(product_id) {
        console.log("Status ändern");
    }

    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <SendMailsButton />
                <h2 className="mt-8">Infos zum Verkäufer finden</h2>
                <div className='flex gap-4'>
                    <div className="">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input type="text" onChange={searchSeller} className="w-full rounded py-2 px-4 text-ourSuperDarkGray placeholder:text-ourGray focus:outline-ourPrimaryColor" id="sellerSearchBar" placeholder="Verkäufer suchen..." />
                            <div>
                                {searchedSeller.map((seller) => (
                                    <div key={seller.id} onClick={() => handleSellerClick(seller)} className="px-4 py-2 cursor-pointer bg-white border border-ourLightGray rounded hover:text-ourPrimaryColorHover">
                                        <p className="text-sm">{seller.seller_name} {seller.seller_firstname}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <ButtonSmallJustIcon tooltip="Verkäufer finden" icon={<UilSearch />} /> */}
                </div>
                {allProductsFromSeller.length !== 0 &&
                    <div className="grid grid-cols-3 mt-4 bg-white rounded border-ourLightGray border">
                        <div className="flex justify-center items-center py-4">
                            <p>{name}</p>
                        </div>
                        <div className="flex justify-center flex-col items-center border-l border-ourLightGray border-r py-4">
                            <p className='font-semibold'>{sellerPayback}€</p>
                            <p className='mt-4'>Erlös</p>
                        </div>
                        <div className="flex justify-between text-center items-center py-4 px-8">
                            <p>{getUnsoldProductsText()}</p>
                        </div>
                    </div>
                }
                {allProductsFromSeller.length !== 0 &&
                    <div className="rounded border border-ourLightGrey mt-4 bg-white mb-4">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light rounded">
                                <thead className="font-medium">
                                    <tr>
                                        <th scope="col" className="px-8 py-4">
                                            #
                                        </th>
                                        <th scope="col" className="px-8 py-4">
                                            Artikel
                                        </th>
                                        <th scope="col" className="px-8 py-4">
                                            Kategorie
                                        </th>
                                        <th scope="col" className="px-8 py-4">
                                            Preis
                                        </th>
                                        <th scope="col" className="px-8 py-4">
                                            Wurde abgeholt
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProductsFromSeller.map((product) => (
                                        <tr key={product.id} className="bg-white dark:border-ourDarkGray dark:bg-ourSuperDarkGray">
                                            <td></td>
                                            <td className="whitespace-nowrap px-8 py-4">{product.product_name}</td>
                                            <td className="whitespace-nowrap px-8 py-4">{product.product_category}</td>
                                            <td className="whitespace-nowrap px-8 py-4">{product.product_price}</td>
                                            <td className="whitespace-nowrap px-8 py-4"><button className='hover:text-ourPrimaryColorHover' onClick={() => setStatusToPickedUp(product.product_id)}><UilCheck size="17" /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
