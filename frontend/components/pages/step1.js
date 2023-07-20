import React, { useState, useContext, useEffect } from "react";
import FormInput from "../input/formInput/formInput";
import { UilAngleRight } from "@iconscout/react-unicons";
import { BazarContext } from "../../pages/index.js";
import Alert from "../alert/alert";
import {
  checkBazarName,
  checkYear,
  checkCommission,
  checkDescription,
} from "../utils/inputValidation.js";

export default function Step1() {
  const [bazarName, setBazarName] = useState("");
  const [bazarYear, setBazarYear] = useState("");
  const [bazarCommission, setBazarCommission] = useState("");
  const [bazarDescription, setBazarDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validName, setValidName] = useState(false);
  const [validYear, setValidYear] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validCommission, setValidCommission] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { setStep, setCurrentBazar } = useContext(BazarContext);

  const handleAddBazar = () => {
    setFormSubmitted(true);
    checkInput();
  };

  useEffect(() => {
    const bazar = {
      bazar_name: bazarName,
      bazar_year: bazarYear,
      bazar_commission: bazarCommission,
      bazar_description: bazarDescription,
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
          console.log(data);
          if (typeof data === "object" && data !== null) {
            setStep(2);
            setCurrentBazar(bazar.bazar_name);
          }
        })
        .catch((error) => {
          setErrorMessage(
            "Ups, da ist etwas schief gelaufen. Bitte versuche es später noch einmal."
          );
          console.log(error);
        });

      // Clear input fields
      setBazarName("");
      setBazarYear("");
      setBazarCommission("");
      setBazarDescription("");
    }
  }, [validName, validYear, validCommission, validDescription]);

  const checkInput = () => {
    checkCommission(bazarCommission, setErrorMessage, setValidCommission);
    checkYear(bazarYear, setErrorMessage, setValidYear);
    checkBazarName(bazarName, setErrorMessage, setValidName);
    checkDescription(bazarDescription, setErrorMessage, setValidDescription);
  };

  useEffect(() => {
    if (errorMessage !== "") {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <>
      {errorMessage !== "" && <Alert type="error" text={errorMessage} />}
      <div>
        <h1>1. Basar erstellen</h1>
        <p>
          Als erstes sollten wir ein paar generelle Infos zu deinem anstehenden
          Basar festhalten. Fülle einfach die vorgefertigen Felder aus!
        </p>
      </div>
      <div>
        <div>
          <div className="flex justify-between gap-4">
            <FormInput
              name="Name des Basars"
              value={bazarName}
              onChange={(e) => setBazarName(e.target.value)}
              validInput={validName}
              submitted={formSubmitted}
            />
            <FormInput
              name="Jahr"
              value={bazarYear}
              onChange={(e) => setBazarYear(e.target.value)}
              validInput={validYear}
              submitted={formSubmitted}
            />
            <FormInput
              name="Provision"
              unit="%"
              value={bazarCommission}
              onChange={(e) => setBazarCommission(e.target.value)}
              validInput={validCommission}
              submitted={formSubmitted}
            />
          </div>
          <div class="col-span-full">
            <label
              for="about"
              class="block text-sm font-medium leading-6 text-ourSuperDarkGray mt-4"
            >
              Beschreibung
            </label>
            <div class="mt-2">
              <textarea
                placeholder="Eine kurze optionale Beschreibung des geplanten Basars"
                id="about"
                name="about"
                rows="3"
                class="block focus:outline-ourPrimaryColor w-full rounded-md border-0 px-2 py-1.5 text-ourSuperDarkGray shadow-sm ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                onChange={(e) => setBazarDescription(e.target.value)}
              ></textarea>
            </div>
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
