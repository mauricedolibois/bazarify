import ButtonBigColor from "./ButtonBigColor";
import { UilEnvelopeUpload } from "@iconscout/react-unicons";
import React from "react";

function SendMailsButton() {
  return (
    <>
      <ButtonBigColor
        icon={<UilEnvelopeUpload />}
        text="Verkäufer benachrichtigen"
      />
    </>
  );
}
export default SendMailsButton;
