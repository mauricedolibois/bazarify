import { UilCheck, UilInfoCircle, UilEnter } from "@iconscout/react-unicons";
import CalculationPopup from "../popups/CalculationPopup/CalculationPopup";
import { useState, useEffect, useRef } from "react";
import ButtonYellowBorder from "../buttons/ButtonYellowBorder";
import ProductTable from "../table/productTable";
import Alert from "../alert/alert";
import BarcodeScanner from "../input/BarcodeScanner/BarcodeScanner";

//TODO: check if input is a number
//TODO: check if offer exists in database
//TODO: autofocus on input field
//TODO: increase width of input field
//TODO: add error message for invalid input
//TODO: display info when there's no product scanned yet

export default function () {
  const [barcode, setBarcode] = useState("");
  const [offer, setOffer] = useState("");
  const [scannedProducts, setScannedProducts] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [allUpdatedOffers, setAllUpdatedOffer] = useState("");
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  let input;
  let tmpAllUpdatedOffers = [];

  const closePopup = () => {
    setPopupOpened(false);
    // Callback
  };

  const handleScan = () => {
    input = document.getElementById("Barcode des Produkts");
    const inputValue = input.value.trim();

    if (inputValue !== "") {
      // Check if input is a number
      if (!isNaN(inputValue)) {
        console.log("Enter pressed");
        setBarcode(inputValue);
        input.value = "";
      } else {
        console.log("Invalid input: not a number");
        setMsg({ type: "error", text: "Gib eine gültige Zahl ein" });
        input.value = "";
      }
    } else {
      console.log("Input is empty");
      setMsg({ type: "error", text: "Gib eine gültige Zahl ein" });
    }
  };

  //const totalPrice = scannedProducts.reduce((total, product) => total + product.product_price, 0);
  const [totalPrice, setTotalPrice] = useState(
    scannedProducts.reduce((total, product) => total + product.product_price, 0)
  );

  // Use Effect hook to always refresh the totalPrice whenever a new product is added to the scannedProducts array
  useEffect(() => {
    setTotalPrice(
      scannedProducts.reduce(
        (total, product) => total + product.product_price,
        0
      )
    );
  }, [scannedProducts, popupOpened]);

  const getFinalTotalPrice = () => {
    return totalPrice;
  };

  //handle enter key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleScan();
      }
    };

    input = document.getElementById("Barcode des Produkts");
    input.addEventListener("keydown", handleKeyDown);
    console.log("useEffect triggered");

    return () => {
      input.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  //fetch offer from database
  useEffect(() => {
    if (barcode !== "") {
      fetch(
        "http://localhost:8080/api/offer?operator=offer_id&parameter=" +
        barcode,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data) => {
          setOffer(data);
          setBarcode("");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          setMsg({ type: "error", text: "Produkt nicht gefunden" });
        });
    }
  }, [barcode]); //barcode == offer_id

  //fetch product from database
  useEffect(() => {
    if (offer !== "") {
      // Check if product is already scanned
      const productExists = scannedProducts.some(
        (product) => product.product_id === offer.product_id
      );
      // Check if product is already sold
      const productAllreadySold = offer.state === "sold";
      // Check if product is already reclined
      const productAllreadyReclined = offer.state === "reclined";

      switch (true) {
        case productExists:
          console.log("Product already scanned");
          setMsg({ type: "error", text: "Produkt wurde bereits gescannt" });
          break;
        case productAllreadySold:
          console.log("Product already sold");
          setMsg({ type: "error", text: "Produkt wurde bereits verkauft" });
          break;
        case productAllreadyReclined:
          console.log("Product already reclined");
          setMsg({ type: "error", text: "Produkt wurde bereits abgeholt" });
          break;
        default:
          fetch(
            "http://localhost:8080/api/product?operator=product_id&parameter=" +
            offer.product_id,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((data) => {
              setScannedProducts((scannedProducts) => [
                ...scannedProducts,
                data,
              ]);
              setShouldScrollToBottom(true);
              setAllOffers((allOffers) => [...allOffers, offer]);
              console.log(scannedProducts);
              console.log(data);
            })
            .catch((error) => console.log(error));
          break;
      }
    }
  }, [offer]);

  const handleSubmit = () => {
    console.log("submit");
    //update offer status to sold
    allOffers.forEach((offer) => {
      const updatedOffer = {
        ...offer,
        state: "sold",
      };
      tmpAllUpdatedOffers.push(updatedOffer);
      console.log("all offers: ", allOffers);
      console.log("updated offer: ", updatedOffer);
      setAllUpdatedOffer(tmpAllUpdatedOffers);
    });

    //open popup
    setPopupOpened(true);

    // Reset table to show no products
    setScannedProducts([]);
    setAllOffers([]);

    console.log("TotalPrice" + totalPrice);
  };

  //update offer status to sold in db
  useEffect(() => {
    if (allUpdatedOffers !== "") {
      allUpdatedOffers.forEach((offer) => {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(offer),
        };
        fetch(
          "http://localhost:8080/api/offer?operator=offer_id&parameter=" +
          offer.offer_id,
          requestOptions
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.log(error));
      });
    }
  }, [allUpdatedOffers]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) {
      // Überprüfe den Trigger-Wert
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      setShouldScrollToBottom(false); // Setze den Trigger zurück, um erneutes Scrollen zu verhindern
    }
  }, [shouldScrollToBottom]);

  return (
    <>
      {msg.type !== "" && msg.text !== "" && (
        <Alert type={msg.type} text={msg.text} setMsg={setMsg} />
      )}
      <h1>3. Verkauf</h1>
      <p className="mb-4">
        Klasse! Du solltest jetzt alle Produkte eingetragen haben. Ab jetzt
        kannst du die Verkäufe abrechnen. Scanne dafür einfach die Codes der
        Produkte ein, welche ein Kunde kaufen möchte. Alternativ kannst du sie
        auch eintippen. Wenn du alle Verkäufe eingescannt hast, kannst du weiter
        zum nächsten Schritt.
      </p>
      <BarcodeScanner onClick={handleScan} />

      {scannedProducts.length === 0 ? (
        <div className="rounded border border-ourLightGray bg-white mb-8 h-80 overflow-y-auto">
          <div className="overflow-hidden">
            <div className="flex flex-col justify-center items-center mb-32 mt-32">
              <UilInfoCircle className="text-ourGray text-4xl mb-4"></UilInfoCircle>
              <p className="text-ourGray text-sm">
                Hier werden dann deine gescannten Produkte angezeigt.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ProductTable
          data={scannedProducts}
          setData={setScannedProducts}
          setMsg={setMsg}
          shouldScrollToBottom={shouldScrollToBottom}
          setShouldScrollToBottom={setShouldScrollToBottom}
          type="scan"
        />
      )}

      <h2>Gesamt: {totalPrice}€</h2>
      <hr className="border-ourLightGray"></hr>
      <div className="mt-4 gap-4 flex">
        <ButtonYellowBorder
          icon={<UilCheck />}
          text="Verkauf abschließen"
          onClick={handleSubmit}
        ></ButtonYellowBorder>
        {popupOpened && (
          <>
            <CalculationPopup
              popupOpen={popupOpened}
              closePopup={closePopup}
              getFinalTotalPrice={getFinalTotalPrice}
            ></CalculationPopup>
          </>
        )}
      </div>
    </>
  );
}
