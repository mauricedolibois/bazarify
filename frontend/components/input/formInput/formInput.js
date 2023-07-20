import React from 'react';

const FormInput = ({ name, value, unit, onChange, validInput, submitted }) => {
  let borderStyle = !validInput && submitted  ? 'border-ourDarkRed' : '';

  const handleChange = (e) => {
    onChange(e);
    borderStyle = '';
  };

  return (
    <div className="col-span-full mt-4">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-ourSuperDarkGray">
        {name}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center"></div>
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          className={`block w-full rounded-md focus:outline-ourPrimaryColor border ${borderStyle} py-1.5 pl-2 pr-20 text-ourSuperDarkGray ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          placeholder={name}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <label htmlFor={name} className="sr-only">
            {name}
          </label>
          <span className="text-ourDarkGray sm:text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
