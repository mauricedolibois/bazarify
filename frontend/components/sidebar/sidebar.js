import { UilAngleRight, UilApps, UilPlus, UilQuestionCircle } from "@iconscout/react-unicons";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { BazarContext } from "../../pages/index.js";
import SidebarButton from "../buttons/SidebarButton.js";
import HelpPopup from "../popups/HelpPopup/HelpPopup.js";

function Step({ step, text, currentStep }) {
  let stepClass = "text-sm text-ourGray";
  if (step === currentStep) {
    stepClass = "text-sm text-ourPrimaryColor font-bold";
  } else if (step < currentStep) {
    stepClass = "text-sm line-through";
  }

  return (
    <li className="flex items-center">
      <span className={stepClass}>
        {step}. {text}
      </span>
    </li>
  );
}

export default function Sidebar() {
  const { step, setStep, currentBazar } = useContext(BazarContext);
  const [bazar, setBazar] = useState("");

  useEffect(() => {
    setBazar(currentBazar);
  }, [currentBazar]);

  function showDashboard() {
    setStep(0);
  }

  function goToNextStep() {
    if (step < 5) {
      setStep(step + 1);
    } else {
      showDashboard();
    }
  }

  function goToStep(step) {
    setStep(step);
  }

  return (
    <>
      <div className="flex h-screen flex-col bg-white min-w-[20%] max-w-md border-r border-ourLightGray">
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center cursor-pointer">
            <Link onClick={showDashboard} href="">
              <span className="pl-4 font-serif text-2xl text-ourPrimaryColor">B</span>
              <span className="font-serif text-2xl">azarify</span>
            </Link>
          </div>
          <HelpPopup />
        </div>

        <div className="flex flex-row px-4 py-4 gap-4">
          <Link href="/" onClick={showDashboard} className="w-full">
            <SidebarButton text="Bazare verwalten" icon={<UilApps />} />
          </Link>
        </div>

        <div className="border-t border-ourLightGray pb-4"></div>

        <h3 className="px-4 py-2 text-lg font-bold text-ourSuperDarkGray">
          {step === 0 ? "Ablauf" : currentBazar.replaceAll("_", " ")}
        </h3>

        <ul className="flex flex-grow flex-col space-y-2 px-4 py-2">
          <Step step={1} text="Basar erstellen" currentStep={step} />
          <Step step={2} text="Annahme" currentStep={step} />
          <Step step={3} text="Verkauf" currentStep={step} />
          <Step step={4} text="Abholung" currentStep={step} />
          <Step step={5} text="Analytics und Bilanz" currentStep={step} />
        </ul>
      </div>
    </>
  );
}