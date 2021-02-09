import React, { useContext, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from 'context/CartContext'


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

  useEffect(() => {
    getProductById(data.shopifyProduct.shopifyId).then(result => {
      setProduct(result)
      setSelectedVariant(result?.variants[0]);
    })
  }, [getProductById, setProduct]);

  const handleVariantChange = (e) => {
    setSelectedVariant(product?.variants.find(v => v.id === e.target.value));
  }

  return (
    <Layout>
      <Grid>
        <div>
          <h1>{data.shopifyProduct.title}</h1>
          <p>{data.shopifyProduct.description}</p>
          { product?.availableForSale &&
            <>
            <SelectWrapper>
              <strong>Variant</strong>
              <select onChange={handleVariantChange}>
              {product?.variants.map(v => (
                <option 
                  key={v.id}
                  value={v.id}
                >
                  {v.title}
                </option>
              ))}
              </select>
            </SelectWrapper>
            {!!selectedVariant && <Price>${selectedVariant.price}</Price>}
            </>
          }
        </div>
        <div>
          <ImageGallery images={data.shopifyProduct.images} />
        </div>
      </Grid>
    </Layout>
  );
}