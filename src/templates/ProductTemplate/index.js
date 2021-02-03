import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query ProductQuery($shopifyId: String){
    shopifyProduct(shopifyId: {eq: $shopifyId}) {
      title
    }
  }
`;

export default function ProductTemplate(props) {
  const { data } = props;
  console.log(props);
  return <h1>{data.shopifyProduct.title}</h1>;
}