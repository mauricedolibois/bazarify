import React from 'react';

function SellerInformation() {
    // Annahme: Der Name, der Erlös und die Anzahl der nicht verkauften Produkte werden aus dem Backend geholt
    const name = 'John Doe';
    const revenue = 230;
    const unsoldProductsCount = 5;

    // Funktion zum Bestimmen des Texts für den dritten Div-Inhalt basierend auf der Anzahl der nicht verkauften Produkte
    const getUnsoldProductsText = () => {
        if (unsoldProductsCount === 0) {
            return 'Keine nicht verkaufte Produkte vorhanden';
        } else {
            return `${unsoldProductsCount} nicht verkaufte Produkte vorhanden`;
        }
    };

    return (
        <div class="grid grid-cols-3 bg-white rounded border-ourLightGray border ">
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





    );
};

export default SellerInformation;