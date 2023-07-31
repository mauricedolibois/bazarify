import React from "react";

const FormInput = ({
  id,
  value,
  label,
  unit,
  onChange,
  validInput,
  submitted,
  placeholder,
}) => {
  //red border style when input isn't valid
  let borderStyle = !validInput && submitted ? "border-ourDarkRed" : "";

  const handleChange = (e) => {
    onChange(e);
    borderStyle = "";
  };

  return (
    <div className="col-span-full mt-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-ourSuperDarkGray"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          id={id}
          value={value}
          className={`block w-full rounded-md focus:outline-ourPrimaryColor border ${borderStyle} py-2 px-4 text-ourSuperDarkGray ring-1 ring-inset ring-ourLightGray text-sm placeholder:text-sm placeholder:text-ourGray focus:ring-2 focus:ring-inset`}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <label htmlFor={id} className="sr-only">
            {id}
          </label>
          <span className="text-ourDarkGray sm:text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
