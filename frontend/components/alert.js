import React, { useState } from 'react';
import { UilTimesCircle, UilCheck } from '@iconscout/react-unicons';

const Alert = ({ type, text }) => {
    let textColor = "";
    let ourBackgroundColor = "";
    let icon = "";

  // Conditionally set color and icon based on the type prop
  if (type === "error") {
    textColor = "text-ourDarkRed";
    ourBackgroundColor = "bg-ourLightRed";
    icon = <UilTimesCircle size="20" className="mr-2" />;
  } else {
    textColor = "text-ourDarkGreen";
    ourBackgroundColor = "bg-ourLightGreen";
    icon = <UilCheck size="20" className="mr-2" />;
  }

  return (
    <div className={`fixed z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 mt-4 text-sm ${textColor} rounded-lg ${ourBackgroundColor}`} role="alert">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default Alert;
