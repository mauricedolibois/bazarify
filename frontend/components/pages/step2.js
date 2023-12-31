import React, { useState, useEffect } from "react";
import UnderlinedInput from "../input/underlinedInput/underlinedInput";
import ButtonSmallJustIcon from "../buttons/ButtonSmallJustIcon";
import ButtonYellowBorder from "../buttons/ButtonYellowBorder";
import { UilPlus, UilInfoCircle, UilPrint } from "@iconscout/react-unicons";
import Alert from "../alert/alert";
import printPDF from "../../utils/printPDF";
import ProductTable from "../table/productTable";
import {
  checkProductName,
  checkProductCategory,
  checkPrice,
  checkName,
  checkPhoneNumber,
  checkEmail,
} from "../../utils/inputValidation.js";

export default function () {
  const [sellerFirstName, setSellerFirstName] = useState("");
  const [sellerLastName, setSellerLastName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhoneNumber, setSellerPhoneNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [productSubmitted, setProductSubmitted] = useState(false);
  const [sellerSubmitted, setSellerSubmitted] = useState(false);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [validProductName, setValidPoductName] = useState(false);
  const [validProductCategory, setValidPoductCategory] = useState(false);
  const [validProductPrice, setValidPoductPrice] = useState(false);
  const [validSellerFirstName, setValidSellerFirstName] = useState(false);
  const [validSellerLastName, setValidSellerLastName] = useState(false);
  const [validSellerPhoneNumber, setValidSellerPhoneNumber] = useState(false);
  const [validSellerEmail, setValidSellerEmail] = useState(false);
  const [printUrl, setPrintUrl] = useState("");

  const allProductInputsEmpty =
    productName === "" && productCategory === "" && productPrice === "";
  const validProductInput =
    validProductName && validProductCategory && validProductPrice;
  const validSellerInput =
    validSellerLastName &&
    validSellerFirstName &&
    validSellerEmail &&
    validSellerPhoneNumber;

  const handleAddPendingProduct = () => {
    setProductSubmitted(true);
    checkProductInput();
  };

  const checkProductInput = () => {
    checkPrice(productPrice, setMsg, setValidPoductPrice);
    checkProductCategory(productCategory, setMsg, setValidPoductCategory);
    checkProductName(productName, setMsg, setValidPoductName);
  };

  //add to pending product when input is correct
  useEffect(() => {
    if (validProductInput) {
      setMsg({
        type: "success",
        text: `Produkt "${productName}" wurde hinzugefügt`,
      });

      const productData = {
        product_name: productName,
        product_price: productPrice,
        product_category: productCategory,
      };

      setPendingProducts((pendingProducts) => [
        ...pendingProducts,
        productData,
      ]);
      setShouldScrollToBottom(true);
      setProductName("");
      setProductCategory("");
      setProductPrice("");
      setSellerSubmitted(false);
    } else {
      console.log("invalid product input!");
    }
  }, [validProductName, validProductCategory, validProductPrice]);

  const handleAddOffer = async () => {
    if (pendingProducts.length !== 0) {
      setSellerSubmitted(true);
      checkSellerInput();
    } else {
      setMsg({
        type: "error",
        text: "Füge erst Produkte den Verkäufers hinzu",
      });
    }
  };

  const checkSellerInput = () => {
    checkName(sellerFirstName, setMsg, setValidSellerFirstName, "Vorname");
    checkName(sellerLastName, setMsg, setValidSellerLastName, "Nachname");
    checkEmail(sellerEmail, setMsg, setValidSellerEmail);
    checkPhoneNumber(sellerPhoneNumber, setMsg, setValidSellerPhoneNumber);
  };

  //set seller when input is correct which triggers adding the pending products to db and open print preview
  useEffect(() => {
    if (validSellerInput) {
      const sellerData = {
        seller_name: sellerLastName,
        seller_firstname: sellerFirstName,
        seller_email: sellerEmail,
        seller_phone: sellerPhoneNumber,
      };

      if (allProductInputsEmpty) {
        setSeller(sellerData);
        setSellerFirstName("");
        setSellerLastName("");
        setSellerEmail("");
        setSellerPhoneNumber("");
        setSellerSubmitted(false);
      } else {
        setSeller(sellerData);
        setMsg({
          type: "error",
          text: "Füge das einegebene Produkt über das + hinzu oder leere die Eingabe für das Produkt",
        });
        setSellerSubmitted(false);
      }
    } else {
      console.log("invalid seller input!");
    }
  }, [
    validSellerFirstName,
    validSellerLastName,
    validSellerEmail,
    validSellerPhoneNumber,
  ]);

  useEffect(() => {
    if (printUrl !== "") {
      printPDF(printUrl);
      setPrintUrl("");
    }
  }, [printUrl]);

  useEffect(() => {
    if (seller !== "" && allProductInputsEmpty) {
      fetch("http://localhost:8080/api/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: pendingProducts,
          seller: seller,
        }),
      })
        .then((res) => res.json())
        .then((data) => setPrintUrl(data))
        .catch((error) => {
          console.log(error);
        });
      setPendingProducts([]);
      setSellerSubmitted(false);
    }
  }, [seller]);

  return (
    <>
      <div>
        {msg.text !== "" && msg.type !== "" && (
          <Alert type={msg.type} text={msg.text} setMsg={setMsg} />
        )}
        <h1>2. Annahme</h1>
        <p className="mb-4">
          Jetzt kannst du damit anfangen die Produkte verschiedener Verkäufer
          hinzuzufügen. Wenn du das erledigt hast, kannst du im nächsten Schritt
          die Verkäufe einscannen. Das solltest du aber erst machen, wenn alle
          Produkte eingepflegt sind.
        </p>
      </div>
      <div className="relative flex flex-col justify-center">
        <div className="rounded border border-ourLightGray bg-white">
          <div className="flex flex-row">
            <div className="w-[36%] border-r pb-8 border-ourLightGray py-4 px-8">
              <h3 className="">Infos zum Verkäufer</h3>

              <UnderlinedInput
                id="sellerFirstName"
                placeholder="Vorname"
                value={sellerFirstName}
                onChange={(e) => setSellerFirstName(e.target.value)}
                validInput={validSellerFirstName}
                submitted={sellerSubmitted}
              />
              <UnderlinedInput
                id="sellerLastName"
                placeholder="Nachname"
                value={sellerLastName}
                onChange={(e) => setSellerLastName(e.target.value)}
                validInput={validSellerLastName}
                submitted={sellerSubmitted}
              />

              <UnderlinedInput
                id="sellerEmail"
                placeholder="Email"
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
                validInput={validSellerEmail}
                submitted={sellerSubmitted}
              />
              <UnderlinedInput
                id="sellerPhoneNumber"
                placeholder="Telefonnummer"
                value={sellerPhoneNumber}
                onChange={(e) => setSellerPhoneNumber(e.target.value)}
                validInput={validSellerPhoneNumber}
                submitted={sellerSubmitted}
              />
            </div>
            <div className="w-[64%] py-4 px-8">
              <h3 className="">Produkte des Verkäufers</h3>
              <div className="flex flex-row gap-4">
                <UnderlinedInput
                  id="productName"
                  placeholder="Produktname"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  validInput={validProductName}
                  submitted={productSubmitted}
                />
                <UnderlinedInput
                  id="productCategory"
                  placeholder="Kategorie"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  validInput={validProductCategory}
                  submitted={productSubmitted}
                />
                <UnderlinedInput
                  id="productPrice"
                  placeholder="Preis in €"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  validInput={validProductPrice}
                  submitted={productSubmitted}
                />
              </div>

              <div className="mt-4 gap-4 flex">
                <ButtonSmallJustIcon
                  onClick={() => handleAddPendingProduct()}
                  tooltip="Weitere Produkte dieses Verkäufers hinzufügen"
                  icon={<UilPlus />}
                ></ButtonSmallJustIcon>
                <ButtonYellowBorder
                  onClick={() => handleAddOffer()}
                  icon={<UilPrint />}
                  text="Barcodes ausdrucken"
                ></ButtonYellowBorder>
              </div>
            </div>
          </div>
          <div className="border-t border-ourLightGray p-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <UilInfoCircle className="mr-4 text-ourDarkGray"></UilInfoCircle>
                <p className="text-sm">
                  Scanne einfach alle Produkte eines Verkäufers ein und drucke
                  dann die Barcodes oben aus
                </p>
              </div>
            </div>
          </div>
        </div>

        {pendingProducts.length > 0 && (
          <ProductTable
            data={pendingProducts}
            setData={setPendingProducts}
            setMsg={setMsg}
            shouldScrollToBottom={shouldScrollToBottom}
            setShouldScrollToBottom={setShouldScrollToBottom}
            type="penned"
          />
        )}
      </div>
    </>
  );
}
