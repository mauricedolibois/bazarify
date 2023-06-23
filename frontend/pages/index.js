import { createContext, useState } from "react";
import React from "react";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import Step1 from "../components/ablauf/step1";
import Step2 from "../components/ablauf/step2";
import Step3 from "../components/ablauf/step3";
import Step4 from "../components/ablauf/step4";
import Step5 from "../components/ablauf/step5";
import Dashboard from "@/components/dashboard";
import ButtonNextStep from "@/components/buttons/ButtonNextStep";
import ButtonLastStep from "@/components/buttons/ButtonLastStep";

export const BazarContext = createContext();

const CreatePage = () => {
  const [currentBazar, setCurrentBazar] = useState("Bazarify");
  const [step, setStep] = useState(0);
  const [newBazar, setNewBazar] = useState({
    name: "test",
    description: "test",
    location: "test",
  });

  function createBazar() { }


  return (
    <>
      <Head>
        <title>Bazarify | Dein einfachster Bazar bisher!</title>
      </Head>
      <BazarContext.Provider
        value={{
          step,
          setStep,
          newBazar,
          setNewBazar,
          createBazar,
          currentBazar,
          setCurrentBazar
        }}
      >
        <div className="flex flex-row">
          <Sidebar />
          <div className="pt-16 px-32">
            {step === 0 && <Dashboard />}
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
          </div>
        </div>



        <div id="scrollManager" className={`fixed bottom-8 right-16 flex items-center justify-end gap-x-6 ${step === 0 ? 'hidden' : ''}`}>
          {/*}
          <ButtonLastStep></ButtonLastStep>
          <ButtonNextStep></ButtonNextStep>
          */}
        </div>
      </BazarContext.Provider>
    </>
  );
};

export default CreatePage;

