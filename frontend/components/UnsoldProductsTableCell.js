import React, { useState, useEffect } from 'react';

const UnsoldProductsTableCell= ({product_id, customer_id}) => {
    const [product, setProduct] = useState('');
    const [customer, setCustomer] = useState('');


    console.log("Product ID: " + product_id)
    console.log("Customer ID: " + customer_id)

//Getproduct
  useEffect(() => {
    fetch('http://localhost:8085/api/product?operator=product_id&parameter='+product_id, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        console.log("Product data: ",data)
        setProduct(data)
      })
      .catch(error => "Error fetch product: " + console.log(error))
  }, [product_id])


//GetCustomer
    useEffect(() => {
        fetch('http://localhost:8085/api/customer?operator=customer_id&parameter='+customer_id, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                console.log("Customer data: ", data)
                setCustomer(data)
            })
            .catch(error => console.log("Customer error: ", error))
    }, [customer_id])



    console.log("Product: " , product)
    console.log("Customer: " , customer)
    
  return (
    <tr className="border-b bg-white dark:border-ourDarkGray dark:bg-ourSuperDarkGray">
        <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-ourSuperDarkGray dark:text-white">
            {product.product_name}</th>
        <td class="px-6 py-4">{customer.customer_name}</td>
        <td class="px-6 py-4">{product.product_category}</td>
        <td class="px-6 py-4">{product.product_price}</td>
    </tr>
  );
};

export default UnsoldProductsTableCell;