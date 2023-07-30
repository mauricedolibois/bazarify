import { UilTrashAlt } from "@iconscout/react-unicons";
import { useContext, useState, useEffect } from "react";
import { BazarContext } from "../../pages/index.js";
import React from "react";

export default function BazarCard({ name }) {
  let { setCurrentBazar, setStep } = useContext(BazarContext);
  const [bazar, setBazar] = useState(undefined);
  const [bazarToDelete, setBazarToDelete] = useState(undefined);

  //switch bazar
  useEffect(() => {
    if (bazar !== undefined) {
      fetch("http://localhost:8080/api/changeBazar?operator=" + name)
        .then((res) => res.json())
        .then((data) => {
          setBazar(undefined);
          setStep(2);
        });
    }
  }, [bazar]);

  //delete bazar
  const deleteBazar = (event) => {
    event.stopPropagation(); // Prevent event propagation
    console.log("clicked");
    setBazarToDelete(name);
  };

  useEffect(() => {
    if (bazarToDelete !== undefined) {
      fetch(
        "http://localhost:8080/api//deleteBazar?operator=" + bazarToDelete,
        { method: "DELETE" }
      )
        .then((res) => res.json())
        .then((data) => {
          setBazarToDelete(undefined);
          //TODO: reload page und maybe bazar ausklappen können
          window.location.reload();
        });
    }
  }, [bazarToDelete]);

  return (
    <div
      onClick={() => {
        setBazar(name);
        setCurrentBazar(name);
      }}
      class="border bg-white border-ourLightGray hover:text-ourPrimaryColorHover items-center mt-2 px-4 py-2 cursor-pointer rounded-lg flex justify-between"
    >
      <p title="Basar wechseln" className="text-sm">
        {name.replaceAll("_", " ")}
      </p>
      <div class="flex justify-between">
        <div title="Basar löschen">
          <UilTrashAlt
            size="17"
            class="inline-block -ml-2 hover:text-red-400 text-ourGray"
            onClick={(event) => {
              deleteBazar(event);
            }}
          />
        </div>
      </div>
    </div>
  );
}
