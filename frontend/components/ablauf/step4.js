import React, { useState, useEffect } from 'react';
import { UilSquareFull, UilInfoCircle, UilEnvelopeUpload, UilSearch } from '@iconscout/react-unicons';
import SellerInformation from "../SellerInformation";
import SendMailsButton from "../buttons/SendMailsButton";
import ButtonBigColor from "../buttons/ButtonBigColor";
import ButtonSmallJustIcon from "../buttons/ButtonSmallJustIcon";
import UnderlindedInput from "../underlinedInput";

export default function AbholungPage() {
    const [allSellers, setAllSellers] = useState([]);
    const [searchedSeller, setSearchedSeller] = useState([]);
    const [allProductsFromSeller, setAllProductsFromSeller] = useState([]);
    const [soldProductsFromSeller, setSoldProductsFromSeller] = useState([]);
    const [unsoldProductsFromSeller, setUnsoldProductsFromSeller] = useState([]);
    const [clickedSellerID, setClickedSellerID] = useState(0);
    const [sellerPayback, setSellerPayback] = useState(0);
    const [name, setName] = useState('Kein Verkäufer ausgewählt');
    const [unsoldProductsCount, setUnsoldProductsCount] = useState(0);
    const [provision, setProvision] = useState(0);
    const [productReclinedID, setProductReclinedID] = useState(0);
    const [searchString, setSearchString] = useState('');



    //get provision
    useEffect(() => {
        fetch('http://localhost:8080/api/analytics', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProvision(data.Provision);
            });
    }, []);

    // get all sellers
    useEffect(() => {
        fetch('http://localhost:8080/api/allSellers', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllSellers(data);
            })
            .catch(error => console.log(error));
    }, []);

    // search seller
    const searchSeller = () => {
        const searchBar = document.getElementById("sellerSearchBar");
        setSearchString(searchBar.value.toLowerCase());
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

    // set clicked seller id
    const handleSellerClick = (seller) => {
        console.log("seller clicked: ", seller);
        setClickedSellerID(seller.seller_id);
        let firstName = seller.seller_name;
        let lastName = seller.seller_firstname;
        let wholeName = firstName + " " + lastName;
        setName(wholeName);
        setSearchedSeller([]);
    };

    // get all products from seller
    useEffect(() => {
        if (clickedSellerID !== 0) {
            console.log("clicked seller id: ", clickedSellerID);
            fetch('http://localhost:8080/api/sellerProducts?seller_id=' + clickedSellerID, { method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    console.log("products from seller: ", data);
                    setAllProductsFromSeller(data);
                    data.map(product => {
                        if (product.offer_status === "sold") {
                            setSoldProductsFromSeller((soldProductsFromSeller) => [...soldProductsFromSeller, product]);
                        } else if (product.offer_status === "open") {
                            setUnsoldProductsFromSeller((unsoldProductsFromSeller) => [...unsoldProductsFromSeller, product]);
                        }
                    });
                })
                .catch(error => console.log(error));
        }
    }, [clickedSellerID]);

    // calculate seller payback
    useEffect(() => {
        console.log("sold products: ", soldProductsFromSeller);
        let tmpSellerPayback = 0;
        soldProductsFromSeller.map(product => {
            tmpSellerPayback += product.product_price;
        });
        tmpSellerPayback = tmpSellerPayback - (tmpSellerPayback * provision / 100); // subtract provision
        setSellerPayback(tmpSellerPayback.toFixed(2));
    }, [soldProductsFromSeller]);

    const getUnsoldProductsText = () => {
        console.log("unsold products: ", unsoldProductsFromSeller);
        if (unsoldProductsFromSeller.length === 0) {
            return 'Es wurden alle Produkte verkauft';
        } else if (unsoldProductsFromSeller.length === 1) {
            return `1 nicht verkauftes Produkt vorhanden`;
        } else {
            return `${unsoldProductsFromSeller.length} nicht verkaufte Produkte vorhanden`;
        }
    };

    const handleReclineProduct = (productID) => {
        console.log("product reclined: ", productID);
        setProductReclinedID(productID);
        //remove product from unsold products
        let tmpUnsoldProducts = [];
        unsoldProductsFromSeller.map(product => {
            if (product.product_id !== productID) {
                tmpUnsoldProducts.push(product);
            }
        });
        setUnsoldProductsFromSeller(tmpUnsoldProducts);
    };

    useEffect(() => {
        if (productReclinedID !== 0) {
            console.log("productReclinedID: ", productReclinedID);
            fetch('http://localhost:8080/api/product-recline?id=' + productReclinedID, { method: 'PUT' })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => console.log(error))
        }
    }, [productReclinedID])

    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <SendMailsButton />
                <h2 className="mt-8">Infos zum Verkäufer finden</h2>
                <input type="text" onChange={searchSeller} className="w-2/3 rounded border border-ourLightGray py-2 px-4 text-ourSuperDarkGray placeholder:text-ourGray focus:outline-ourPrimaryColor" id="sellerSearchBar" placeholder="Verkäufer suchen..." />
                <div>
                    {searchedSeller.map((seller) => (
                        <div key={seller.id} onClick={() => handleSellerClick(seller)} className="px-4 py-2 cursor-pointer bg-white border-b border-l border-r w-2/3 border-ourLightGray hover:text-ourPrimaryColorHover">
                            <p className="text-sm">{seller.seller_name} {seller.seller_firstname}</p>
                        </div>

                    ))}
                </div>

                {/* <ButtonSmallJustIcon tooltip="Verkäufer finden" icon={<UilSearch />} /> */}

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
                    <div className="rounded border border-ourLightGray mt-4 bg-white mb-4">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light rounded">
                                <thead className="font-medium">
                                    <tr>

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
                                            Wurde mittlerweile abgeholt?
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unsoldProductsFromSeller.map((product) => (
                                        <tr key={product.id} className="bg-white dark:border-ourDarkGray dark:bg-ourSuperDarkGray">

                                            {
                                                //TODO: component for each row}
                                            }
                                            <td className="whitespace-nowrap px-8 py-4">{product.product_name}</td>
                                            <td className="whitespace-nowrap px-8 py-4">{product.product_category}</td>
                                            <td className="whitespace-nowrap px-8 py-4">{product.product_price}</td>
                                            <td className="whitespace-nowrap px-8 py-4"><button className='hover:text-ourPrimaryColorHover' onClick={() => handleReclineProduct(product.product_id)}><UilSquareFull size="17" /></button></td>
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
