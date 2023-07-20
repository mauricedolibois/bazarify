import React from 'react';

const UnderlindedInput = ({ id, placeholder, value, onChange, validInput, submitted}) => {
  const borderStyle = !validInput && submitted  ? 'border-ourDarkRed' : 'border-ourLightGray';

  return (
    <div class="group flex items-center">
      <input class={`w-full truncate border-b mt-4 ${borderStyle} text-ourDarkGray focus:border-ourPrimaryColor focus:outline-none`}
        name={id} id={id} type="text" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default UnderlindedInput;