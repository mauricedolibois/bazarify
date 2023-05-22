import React from 'react';

const UnsoldProductsTableCell= ({product_name, costumer_name, product_category, product_price}) => {
  return (
    <tr class="border-b bg-white dark:border-ourDarkGray dark:bg-ourSuperDarkGray">
        <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-ourSuperDarkGray dark:text-white">
            {product_name}</th>
        <td class="px-6 py-4">{costumer_name}</td>
        <td class="px-6 py-4">{product_category}</td>
        <td class="px-6 py-4">{product_price}</td>
    </tr>
  );
};

export default UnsoldProductsTableCell;