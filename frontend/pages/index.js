import { createContext, useState } from "react";
import React from "react";
import Head from "next/head";
import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard";
import AblaufSeite1 from "@/components/ablaufSeite1";
import AblaufSeite2 from "@/components/ablaufSeite2";
import AblaufSeite3 from "@/components/ablaufSeite3";
import AblaufSeite4 from "@/components/ablaufSeite4";
import AblaufSeite5 from "@/components/ablaufSeite5";
import ButtonV1 from "@/components/buttonV1";
import ButtonV2 from "@/components/buttonV2";
import ButtonV3 from "@/components/buttonV3";
import ButtonV4 from "@/components/buttonV4";
import ButtonV5 from "@/components/buttonV5";
import FormInput from "@/components/FormInput";

export const BazarContext = createContext();

const CreatePage = () => {
  const [step, setStep] = useState(1);
  const [newBazar, setNewBazar] = useState({
    name: "test",
    description: "test",
    location: "test",
  });

export default function Home() {
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
        <div className="flex flex-row">
          <Sidebar />
          <div className="pt-32 px-32">
            {step === 0 && <Dashboard />}
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
          </div>
        </div>
      </BazarContext.Provider>
    </>
  );
};

export default CreatePage;