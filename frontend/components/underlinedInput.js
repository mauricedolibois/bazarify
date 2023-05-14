import React from 'react';

const UnderlindedInput = ({id, placeholder, value, onChange}) => {
  return (
    <div class="group flex items-center">
        <input class="w-full truncate border-b border-ourLightGray text-ourDarkGray focus:border-ourPrimaryColor focus:outline-none" 
            name={id} id={id} type="text" value={value} placeholder={placeholder} onChange={onChange}/>
    </div>
  );
};

export default UnderlindedInput;
