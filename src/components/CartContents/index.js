import React, { useContext } from 'react';
import CartContext from 'context/CartContext';

export function CartContents() {
  const { checkout } = useContext(CartContext);

  return (
    <section>
      <h1>Your Cart</h1>
      {checkout?.lineItems?.map(lineItem => (
        <div>{lineItem.title}</div>
      ))}
    </section>
  );
}