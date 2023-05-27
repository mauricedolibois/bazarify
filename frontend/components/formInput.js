import React from 'react';

const FormInput = ({name, unit, onChange}) => {
  return (
    <div class="col-span-full">
        <label for="price" class="block text-sm font-medium leading-6 text-ourSuperDarkGray">{name}</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-2 flex items-center"></div>
          <input type="text" name={name} id={name} class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-ourSuperDarkGray ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder={name} onChange={onChange} />
            <div class="absolute inset-y-0 right-4 flex items-center">
              <label for={name} class="sr-only">{name}</label>
              <span class="text-ourDarkGray sm:text-sm">{unit}</span>
            </div>
        </div>
    </div>
  );
};

export default FormInput;