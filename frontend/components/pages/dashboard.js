import { UilNoEntry, UilPlus } from "@iconscout/react-unicons";
import ButtonBigColor from "../buttons/ButtonBigColor";
import ButtonBigNoColor from "../buttons/ButtonBigNoColor";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { BazarContext } from "../../pages/index.js";
import VideoPopup from "../popups/VideoPopup/VideoPopup";
import BazarCard from "../BazarCard/BazarCard";

export default function dashboard() {
  function loadExampleData() {
    fetch("http://localhost:8080/api/loadExampleData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  let { setStep } = useContext(BazarContext);
  const [bazars, setBazars] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:8080/api/getBazars")
      .then((res) => res.json())
      .then((data) => {
        setBazars(data);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Dashboard</h1>

        <p className="mb-4">
          Willkommen bei Bazarify! Hier kannst du ganz einfach einen neuen Basar
          erstellen oder einen existierenden Basar auswählen. Keine Sorge, wir
          führen dich Schritt für Schritt durch den gesamten Prozess, damit
          dieser dein einfachster Basar bisher wird!
        </p>
        <div class="flex flex-row gap-4">
          {/* Sollen wir das hier lieber mit dem Stepper machen (so wie in der Sidebar, also onClick={showDashboard}) oder mit href? */}
          <Link href="/" onClick={() => setStep(1)}>
            <ButtonBigColor
              text="Neuen Basar erstellen"
              icon={<UilPlus />}
            ></ButtonBigColor>
          </Link>
          <Link href="/">
            <VideoPopup></VideoPopup>
          </Link>
          <Link href="/" onClick={() => loadExampleData()}>
            <ButtonBigNoColor
              text="Demoversion laden"
              icon={<UilNoEntry />}
            ></ButtonBigNoColor>
          </Link>
        </div>
        <h2 className="mt-16">Deine Basare</h2>
        <div class="grid grid-cols-3 gap-4">
          {bazars === undefined ? (
            <p>Keine Basare vorhanden</p>
          ) : (
            bazars.map((bazar) => {
              return bazar.hasOwnProperty("bazar_name") ? (
                <BazarCard name={bazar.bazar_name} />
              ) : null;
            })
          )}
        </div>
      </div>
    </>
  );
}
