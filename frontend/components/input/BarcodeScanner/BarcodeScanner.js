import { useRef, useEffect } from "react";
import { UilEnter } from "@iconscout/react-unicons";
import ButtonSmallJustIcon from "@/components/buttons/ButtonSmallJustIcon";
import React from "react";

export default function BarcodeScanner({ onClick }) {
  const inputRef = useRef(null);

  //autofocus on input field
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="border-ourLightGray border bg-white rounded mb-8">
      <div className="flex flex-row justify-between px-8 py-4 gap-8">
        <input
          className="w-full truncate border-b border-ourLightGray text-ourDarkGray focus:border-ourPrimaryColor focus:outline-none"
          name="name"
          id="Barcode des Produkts"
          type="text"
          ref={inputRef}
          placeholder="Barcode des Produkts"
        />
        <div className="flex flex-row gap-4">
          <ButtonSmallJustIcon
            icon={<UilEnter></UilEnter>}
            onClick={onClick}
          ></ButtonSmallJustIcon>
        </div>
      </div>
    </div>
  );
}
