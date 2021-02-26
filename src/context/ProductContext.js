import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const defaultState = {
  products: [],
};

const ProductContext = React.createContext(defaultState);
export default ProductContext;

export function ProductContextProvider({ children }) {
  return (
    <ProductContext.Provider
      value={{
        products: [],
        collections: [],
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
