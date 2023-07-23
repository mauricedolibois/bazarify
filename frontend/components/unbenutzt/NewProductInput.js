import React from 'react';

const UnderlindedInput = ({ id, placeholder, value, onChange }) => {
  return (
    <div class="group flex items-center">
      <input class="border-b border-ourPrimaryColor text-sm px-2 py-2 mt-2 text-ourDarkGray placeholder "
        name={id} id={id} type="text" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default UnderlindedInput;
