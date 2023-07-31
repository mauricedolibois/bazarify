import React, { useState, useRef, useEffect } from "react";
import { UilMultiply, UilPlay } from "@iconscout/react-unicons";

export default function VideoPopup(onClick) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <div
          onClick={openPopup}
          className="inline-flex flex-col justify-center px-4 py-2 border-2 cursor-pointer hover:text-ourPrimaryColor border-ourLightGray text-black rounded-lg"
        >
          <span>
            <UilPlay>s</UilPlay>
          </span>
          <p className="text-sm mt-4">Tutorial anschauen</p>
        </div>

        {isOpen && (
          <div className="fixed w-screen h-screen top-0 left-0 bg-black/75 flex justify-center items-center popup">
            <div
              className="w-3/4 h-3/4 bg-white rounded-lg relative p-8 flex items-center justify-center"
              ref={popupRef}
            >
              <UilMultiply
                className="absolute text-ourPrimaryColor hover:text-ourPrimaryColorHover top-4 right-4 cursor-pointer z-30"
                onClick={closePopup}
              />

              <iframe
                className="rounded"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                allow="autoplay"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
