import React from 'react';
import UnderlindedInput from './NewProductInput';
import ButtonSmallJustIcon from './buttons/ButtonSmallJustIcon';
import { UilSearch } from '@iconscout/react-unicons'
import FormInput from './formInput';

function SellerInformation(name, revenue, unsoldProductsCount) {
    // Funktion zum Bestimmen des Texts für den dritten Div-Inhalt basierend auf der Anzahl der nicht verkauften Produkte
    const getUnsoldProductsText = () => {
        if (unsoldProductsCount === 0) {
            return 'Keine nicht verkaufte Produkte vorhanden';
        } else {
            return `${unsoldProductsCount} nicht verkaufte Produkte vorhanden`;
        }
    };

    return (
        <>
            <div className='flex gap-4'>
                <div class="">
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-2 flex items-center"></div>
                        <input type="text" class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-ourSuperDarkGray ring-1 ring-inset ring-ourLightGray placeholder:text-ourGray focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder="Verkäufer suchen" />
                    </div>
                </div>
                <ButtonSmallJustIcon icon={<UilSearch></UilSearch>}></ButtonSmallJustIcon>
            </div>

            <div class="grid grid-cols-3 mt-4 bg-white rounded border-ourLightGray border ">
                <div class="flex justify-center items-center py-4">
                    <p>{name}</p>
                </div>
                <div class="flex justify-center flex-col items-center border-l border-ourLightGray border-r py-4">
                    <p className='font-semibold'>{revenue}€</p>
                    <p className='mt-4'>Erlös</p>
                </div>
                <div class="flex justify-between text-center items-center py-4 px-8">
                    <p>{getUnsoldProductsText()}</p>
                </div>
            </div>
        </>
    );
};

export default SellerInformation;