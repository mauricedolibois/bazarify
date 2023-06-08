import React from 'react';
import { UilTrash } from '@iconscout/react-unicons'

const step3TableRow = ({counter, name, categorie, price}) => {
  return (
    <tr class="border-b dark:border-neutral-500">
        <td class="whitespace-nowrap px-8 py-4">{counter}</td>
        <td class="whitespace-nowrap px-8 py-4">{name}</td>
        <td class="whitespace-nowrap px-8 py-4">{categorie}</td>
        <td class="whitespace-nowrap px-8 py-4">{price}€</td>
        <td class="whitespace-nowrap px-8 py-4"><UilTrash size="16"></UilTrash></td>
    </tr>
  );
};

export default step3TableRow;