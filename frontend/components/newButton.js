import React from 'react';
import { UilIcon } from '@iconscout/react-unicons';

const NewButton = ({ icon, label }) => {
    return (
        <button className="flex flex-col justify-center rounded-lg bg-yellow-500 px-4 py-2">
          <span className="text-white">
            {icon}
          </span>
          <span className="text-white mt-4">{label}</span>
        </button>
      );
    };
    

export default NewButton;
