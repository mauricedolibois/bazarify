import React, { useState, useEffect } from "react";
import SendMailsButton from "../buttons/SendMailsButton";
import ProductTable from "../table/productTable";
import SellerSearchBar from "../input/SellerSearchBar";
import Alert from "../alert/alert";
import FormInput from "../input/formInput/formInput";

export default function AbholungPage() {
  const [soldProductsFromSeller, setSoldProductsFromSeller] = useState([]);
  const [unsoldProductsFromSeller, setUnsoldProductsFromSeller] = useState([]);
  const [clickedSellerID, setClickedSellerID] = useState(0);
  const [name, setName] = useState("Kein Verkäufer ausgewählt");
  const [productReclinedID, setProductReclinedID] = useState(0);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // get all products from seller
  useEffect(() => {
    if (clickedSellerID !== 0) {
      console.log("clicked seller id: ", clickedSellerID);
      fetch(
        "http://localhost:8080/api/sellerProducts?seller_id=" + clickedSellerID,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("products from seller: ", data);
          setAllProductsFromSeller(data);
          data.map((product) => {
            if (product.offer_status === "sold") {
              setSoldProductsFromSeller((soldProductsFromSeller) => [
                ...soldProductsFromSeller,
                product,
              ]);
            } else if (product.offer_status === "open") {
              setUnsoldProductsFromSeller((unsoldProductsFromSeller) => [
                ...unsoldProductsFromSeller,
                product,
              ]);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  }, [clickedSellerID]);

  //update offer in db as reclined
  useEffect(() => {
    console.log("useEffect recline ausgeführt!");
    console.log("ProductID im useEffect: ", productReclinedID);
    if (productReclinedID !== 0) {
      fetch(
        "http://localhost:8080/api/product-recline?id=" + productReclinedID,
        { method: "PUT" }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log("reclined product: ", productReclinedID);
        })
        .catch((error) => console.log(error));
    }
  }, [productReclinedID]);

  return (
    <>
      <div>
        {msg.text !== "" && msg.type !== "" && (
          <Alert type={msg.type} text={msg.text} setMsg={setMsg} />
        )}
        <h1>4. Abholung</h1>
        <p className="mb-4">
          Schön, dass du so viel verkaufen konntest. Du solltest jetzt die
          Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre
          liegengebliebene Artikel abholen kommen können.
        </p>
        <SendMailsButton />
        <h2 className="mt-8">Infos zum Verkäufer finden</h2>
        <FormInput id="sellerSearchBar" placeholder="Verkäufer suchen" onChange={searchSeller}></FormInput>
        <div>
          {searchedSeller.map((seller) => (
            <div
              key={seller.id}
              onClick={() => handleSellerClick(seller)}
              className="px-4 py-2 cursor-pointer bg-white border-b border-l border-r rounded border-ourLightGray hover:text-ourPrimaryColorHover"
            >
              <p className="text-sm">
                {seller.seller_name} {seller.seller_firstname}
              </p>
            </div>
          ))}
        </div>

        {clickedSellerID !== 0 && (
          <SellerDisplay
            name={name}
            soldProducts={soldProductsFromSeller}
            unsoldProducts={unsoldProductsFromSeller}
          />
        )}

        {unsoldProductsFromSeller.length !== 0 && (
          <ProductTable
            data={unsoldProductsFromSeller}
            setData={setUnsoldProductsFromSeller}
            setMsg={setMsg}
            type="recline"
            setProductReclinedID={setProductReclinedID}
          />
        )}
      </div>
    </>
  );
}
