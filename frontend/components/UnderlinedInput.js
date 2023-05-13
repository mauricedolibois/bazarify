import React from 'react';

const UnderlindedInput = ({placeholder}) => {
  return (
    <div class="group flex items-center">
        <input class="w-full truncate border-b border-gray-300 text-gray-700 focus:border-yellow-500 focus:outline-none" 
            type="text" placeholder={placeholder} />
    </div>
  );
};

export default UnderlindedInput;