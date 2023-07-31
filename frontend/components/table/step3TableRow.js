import React from "react";
import { UilTrash, UilSquareFull } from "@iconscout/react-unicons";

const step3TableRow = ({
  counter,
  name,
  category,
  price,
  removeItem,
  type,
}) => {
  return (
    <tr>
      <td className="whitespace-nowrap px-8 py-4">{counter}</td>
      <td className="whitespace-nowrap px-8 py-4">{name}</td>
      <td className="whitespace-nowrap px-8 py-4">{category}</td>
      <td className="whitespace-nowrap px-8 py-4">{price}€</td>
      <td className="whitespace-nowrap px-8 py-4">
        <button className="hover:text-red-400" onClick={removeItem}>
          {type === "recline" ? (
            <UilSquareFull size="17"></UilSquareFull>
          ) : (
            <UilTrash size="17"></UilTrash>
          )}
        </button>
      </td>
    </tr>
  );
};

export default step3TableRow;
