import React from 'react';
import { UilTimesCircle } from '@iconscout/react-unicons';

const Alert = ({ type, message }) => {
  return (
    <div className="fixed z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <UilTimesCircle size="20" className="mr-2" />
      <span className="font-medium">{type}</span>
      <span className="ml-1">{message}</span>
    </div>
  );
};

export default Alert;
