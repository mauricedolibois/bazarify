import React from 'react';

const UnderlinedInput = ({placeholder}) => {
  return (
    <div class="group flex items-center">
        <input class="w-full truncate border-b border-ourLightGray text-ourDarkGray focus:border-ourPrimaryColor focus:outline-none" 
            type="text" placeholder={placeholder} />
    </div>
  );
};

export default UnderlinedInput;