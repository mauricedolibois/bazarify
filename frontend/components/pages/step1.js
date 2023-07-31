import React, { useState, useContext, useEffect } from "react";
import FormInput from "../input/formInput/formInput";
import { UilAngleRight } from "@iconscout/react-unicons";
import { BazarContext } from "../../pages/index.js";
import Alert from "../alert/alert";
import {
  checkBazarName,
  checkYear,
  checkCommission,
} from "../../utils/inputValidation.js";

export default function Step1() {
  const [bazarName, setBazarName] = useState("");
  const [bazarYear, setBazarYear] = useState("");
  const [bazarCommission, setBazarCommission] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [validName, setValidName] = useState(false);
  const [validYear, setValidYear] = useState(false);
  const [validCommission, setValidCommission] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { setStep, setCurrentBazar } = useContext(BazarContext);

  const handleAddBazar = () => {
    setFormSubmitted(true);
    checkInput();
  };

  const checkInput = () => {
    checkCommission(bazarCommission, setMsg, setValidCommission);
    checkYear(bazarYear, setMsg, setValidYear);
    checkBazarName(bazarName, setMsg, setValidName);
  };

  //create new Bazar when all inputs are correct
  useEffect(() => {
    const bazar = {
      bazar_name: bazarName,
      bazar_year: bazarYear,
      bazar_commission: bazarCommission,
    };

    if (validName && validYear && validCommission) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bazar),
      };
      fetch("http://127.0.0.1:8080/api/newBazar", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (typeof data === "object" && data !== null) {
            setStep(2);
            setCurrentBazar(bazar.bazar_name);
          }
        })
        .catch((error) => {
          setMsg({
            type: "error",
            text: "Ups, da ist etwas schief gelaufen. Bitte versuche es später noch einmal.",
          });
          console.log(error);
        });

      // Clear input fields
      setBazarName("");
      setBazarYear("");
      setBazarCommission("");
    }
  }, [validName, validYear, validCommission]);

  return (
    <>
      {msg.type !== "" && msg.text !== "" && (
        <Alert type={msg.type} text={msg.text} setMsg={setMsg} />
      )}
      <div>
        <h1>1. Basar erstellen</h1>
        <p>
          Als erstes sollten wir ein paar generelle Infos zu deinem anstehenden
          Basar festhalten. Fülle einfach die vorgefertigen Felder aus!
        </p>
      </div>
      <div>
        <div>
          <div className="flex flex-col gap-2">
            <FormInput
              id="Name des Basars"
              label="Name des Basars"
              value={bazarName}
              onChange={(e) => setBazarName(e.target.value)}
              validInput={validName}
              submitted={formSubmitted}
              placeholder="Skibasar"
            />
            <FormInput
              id="Jahr"
              label="Jahr"
              value={bazarYear}
              onChange={(e) => setBazarYear(e.target.value)}
              validInput={validYear}
              submitted={formSubmitted}
              placeholder={new Date().getFullYear()}
            />
            <FormInput
              id="Provision"
              label="Provision"
              unit="%"
              value={bazarCommission}
              onChange={(e) => setBazarCommission(e.target.value)}
              validInput={validCommission}
              submitted={formSubmitted}
              placeholder="5"
            />
          </div>
        </div>

        <div
          id="scrollManager"
          className="fixed bottom-8 right-16 flex items-center justify-end gap-x-6 z-40"
        >
          <button
            type="submit"
            onClick={() => handleAddBazar()}
            title="Weiter zum nächsten Schritt"
            className="flex items-center justify-center w-10 h-10 bg-ourPrimaryColor  cursor-pointer hover:bg-ourPrimaryColorHover text-white rounded-full"
          >
            <span className="flex items-center justify-center">
              <UilAngleRight />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
