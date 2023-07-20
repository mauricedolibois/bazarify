import React from "react";
import { UilTrash } from "@iconscout/react-unicons";
import ButtonSmallJustIcon from "../buttons/ButtonSmallJustIcon";

const step3TableRow = ({ counter, name, category, price, removeItem }) => {
  return (
    <tr>
      <td class="whitespace-nowrap px-8 py-4">{counter}</td>
      <td class="whitespace-nowrap px-8 py-4">{name}</td>
      <td class="whitespace-nowrap px-8 py-4">{category}</td>
      <td class="whitespace-nowrap px-8 py-4">{price}€</td>
      <td class="whitespace-nowrap px-8 py-4">
        <button className="hover:text-red-400" onClick={removeItem}>
          <UilTrash size="17"></UilTrash>
        </button>
      </td>
    </tr>
  );
};

export default step3TableRow;
