import { createContext, useState } from "react";
import React from "react";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import Step1 from "../components/ablaufSeite1";

export const BazarContext = createContext();

const CreatePage = () => {
  const [step, setStep] = useState(1);
  const [newBazar, setNewBazar] = useState({
    name: "test",
    description: "test",
    location: "test",
  });

  function createBazar() { }

  return (
    <>
      <Head>
        <title>Seite | Create</title>
      </Head>
      <BazarContext.Provider
        value={{
          step,
          setStep,
          newBazar,
          setNewBazar,
          createBazar
        }}
      >
        <Sidebar />
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </BazarContext.Provider>
    </>
  );
};

export default CreatePage;

