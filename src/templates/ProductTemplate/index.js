/* eslint-disable jsx-a11y/no-onchange */
import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery, ProductQuantityAdder } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from 'context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';


export const query = graphql`
  query ProductQuery($shopifyId: String){
    shopifyProduct(shopifyId: {eq: $shopifyId}) {
      shopifyId
      title
      description
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default function ProductTemplate(props) {
  const { getProductById } = useContext(CartContext);
  const [product, setProduct] = useState(null) 
  const [selectedVariant, setSelectedVariant] = useState(null)
  const { data } = props;
  const { search, origin, pathname } = useLocation();
  const variantId = queryString.parse(search).variant;
  console.log(product);

  useEffect(() => {
    getProductById(data.shopifyProduct.shopifyId).then(result => {
      setProduct(result)
      setSelectedVariant(result?.variants.find(v => v.id === variantId) || result.variants[0]);
    })
  }, [getProductById, setProduct, data.shopifyProduct.shopifyId, variantId]);

  const handleVariantChange = (e) => {
    const newVariant = product?.variants.find(v => v.id === e.target.value);
    setSelectedVariant(newVariant)
    navigate(`${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
      replace: true
    });
  }

  return (
    <Layout>
      <Grid>
        <div>
          <h1>{data.shopifyProduct.title}</h1>
          <p>{data.shopifyProduct.description}</p>
          { product?.availableForSale && !!selectedVariant &&
            <>
            {product.variants.length > 1 && 
            <SelectWrapper>
              <strong>Variant</strong>
              <select onChange={handleVariantChange} value={selectedVariant.id}>
              {product?.variants.map(v => (
                <option 
                  key={v.id}
                  value={v.id}
                >
                  {v.title}
                </option>
              ))}
              </select>
            </SelectWrapper>}
            {!!selectedVariant &&
              <>
                <Price>${selectedVariant.price}</Price>
                <ProductQuantityAdder
                  available={selectedVariant.available}
                  variantId={selectedVariant.id}
                />
              </>
            }
            </>
          }
        </div>
        <div>
          <ImageGallery images={data.shopifyProduct.images} selectedVariantImageId={selectedVariant?.image.id}/>
        </div>
      </Grid>
    </Layout>
  );
}