import React, { useEffect, useState } from "react";
export default function ({ name, soldProducts, unsoldProducts, provision }) {
  const [sellerPayback, setSellerPayback] = useState(0);
  const [text, setText] = useState("");

  // calculate seller payback
  useEffect(() => {
    console.log("sold products: ", soldProducts);
    let tmpSellerPayback = 0;
    soldProducts.map((product) => {
      tmpSellerPayback += product.product_price;
    });
    tmpSellerPayback = tmpSellerPayback - (tmpSellerPayback * provision) / 100; // subtract provision
    setSellerPayback(tmpSellerPayback.toFixed(2));
  }, [soldProducts]);

  // get the text for the unsold products
  useEffect(() => {
    console.log("unsold products: ", unsoldProducts);
    if (unsoldProducts.length === 0) {
      setText("Es wurden alle Produkte verkauft");
    } else if (unsoldProducts.length === 1) {
      setText(`1 nicht verkauftes Produkt vorhanden`);
    } else {
      setText(`${unsoldProducts.length} nicht verkaufte Produkte vorhanden`);
    }
  }, [unsoldProducts]);

  return (
    <div className="grid grid-cols-3 mt-4 bg-white rounded border-ourLightGray border">
      <div className="flex justify-center items-center py-4">
        <p className="font-bold">{name}</p>
      </div>
      <div className="flex justify-center flex-col items-center border-l border-ourLightGray border-r py-4">
        <p className="font-semibold">{sellerPayback}€</p>
        <p className="mt-4">Erlös</p>
      </div>
      <div className="flex justify-between text-center items-center py-4 px-8">
        <p>{text}</p>
      </div>
    </div>
  );
}
