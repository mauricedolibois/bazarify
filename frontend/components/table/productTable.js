import React, { useState, useRef, useEffect } from "react";
import Step3TableRow from "./step3TableRow";
import step2 from "../pages/step2";

const ProductTable = ({
  data,
  setData,
  setMsg,
  shouldScrollToBottom,
  setShouldScrollToBottom,
  type,
  setProductReclinedID,
}) => {
  const scrollRef = useRef(null);
  let tableTitle;
  let tableSize;

  if (type === "penned") {
    tableTitle = "Eingepflegte Produkte";
    tableSize = "max-h-64";
  } else if (type === "scan") {
    tableTitle = "Eingescannte Produkte";
    tableSize = "h-80";
  } else {
    tableTitle = "Liegengebliebene Produkte";
    tableSize = "max-h-72";
  }

  const handleRemoveProduct = (index) => {
    const productName = data[index].product_name;
    setMsg({
      type: "success",
      text: `Produkt "${productName}" wurde entfernt`,
    });
    setData((data) => data.filter((_, i) => i !== index));
  };

  const handleReclineProduct = (index) => {
    const productID = data[index].product_id.toString();
    const productName = data[index].product_name;
    setProductReclinedID(productID);
    console.log("ProductID: ", productID);

    setMsg({
      type: "success",
      text: `Produkt "${productName}" wurde als abgeholt markiert`,
    });
    //remove product from unsold products
    setData((data) => data.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) {
      // Überprüfe den Trigger-Wert
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setShouldScrollToBottom(false); // Setze den Trigger zurück, um erneutes Scrollen zu verhindern
    }
  }, [shouldScrollToBottom]);

  return (
    <div
      className={`rounded border mt-4 border-ourLightGray bg-white mb-4  ${tableSize} overflow-y-auto`}
    >
      <div className="overflow-hidden">
        <h3 className="px-8 pt-4">{tableTitle}</h3>
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
                Entfernen
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <Step3TableRow
                key={index}
                counter={index + 1}
                name={product.product_name}
                category={product.product_category}
                price={product.product_price}
                removeItem={() =>
                  type === "recline"
                    ? handleReclineProduct(index)
                    : handleRemoveProduct(index)
                }
                type={type}
              />
            ))}
            <tr ref={scrollRef}></tr>{" "}
            {/* Empty row for scrolling to the bottom */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
