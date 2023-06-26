import React from 'react';
import Step3TableRow from './Step3TableRow';

const ProductTable = ({ data }) => {

    const handleRemoveProduct = (index) => {
        setScannedProducts((scannedProducts) => scannedProducts.filter((_, i) => i !== index));
    };

    return (
        <div className="rounded border border-ourLightGrey bg-white mb-4">
        <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light rounded">
                <thead className="font-medium ">
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
                            Entfernen
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {data.map((product, index) => (
                        <Step3TableRow
                            key={index}
                            counter={index + 1}
                            name={product.product_name}
                            category={product.product_category}
                            price={product.product_price}
                            removeItem={() => handleRemoveProduct(index)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ProductTable;