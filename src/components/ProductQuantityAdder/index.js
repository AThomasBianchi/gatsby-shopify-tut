import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { ProductQuantityAdderWrapper } from './styles';

export function ProductQuantityAdder({ variantId, available }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <ProductQuantityAdderWrapper>
      <strong>Quantity</strong>
      <form>
        <Input />
        <Button fullWidth>
          Add to cart
        </Button>
      </form>
    </ProductQuantityAdderWrapper>
  );
};