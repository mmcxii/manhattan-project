import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import { useTitle } from 'Hooks';
import { spacing } from 'Utilities';
import { Card, CardHeader, CardBody, GoBackButton, Rating } from 'Elements';
import placeholder from 'Assets/img/placeholder.png';
import CommentsSection from './CommentsSection';
import { CocktailIngredients } from './CocktailIngredients';

interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  useTitle(product ? product.name : 'Error: Product not Found');

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response: Response = await fetch(`/api/products/${productId}`, { method: 'GET' });

        const errorCodes: number[] = [400, 404, 500];
        if (errorCodes.includes(response.status)) {
          // TODO: Handle Errors
          return;
        }

        if (response.status === 200) {
          const successData = await response.json();
          setProduct(successData);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getProductDetails();
  }, [productId]);

  return (
    <>
      <GoBackButton />

      {product === null ? (
        <p> Product doesn't exist </p>
      ) : product.type === 'MIXED' ? (
        <>
          <Card as='section'>
            <CardHeader>{product.name}</CardHeader>
            <ProductInfo>
              <Rating
                upvotes={product.upvotes}
                downvotes={product.downvotes}
                id={productId || 'error: product not found'}
                type='products'
                ratingValue={product.rating}
              />
              <Details>
                <DetailWrapper>
                  <strong>Glass Type:</strong>
                  <br />
                  <p>{product.details.glassType}</p>
                </DetailWrapper>

                <DetailWrapper>
                  <strong>Directions:</strong>
                  <br />
                  <p>{product.details.directions}</p>
                </DetailWrapper>

                <DetailWrapper>
                  <strong>Ingredients: </strong>
                  <br />
                  <CocktailIngredients ingredients={product.details.ingredients} />
                </DetailWrapper>
              </Details>
              <Image
                src={product.imgUrl === '//:0' || !product.imgUrl ? placeholder : product.imgUrl}
                alt={product.name}
              />
            </ProductInfo>
          </Card>
          <CommentsSection type={product.type} productId={productId} />
        </>
      ) : (
        <>
          <Card as='section'>
            <CardHeader>{product.name}</CardHeader>
            <ProductInfo>
              <Rating
                upvotes={product.upvotes}
                downvotes={product.downvotes}
                id={productId || 'error: product not found'}
                type='products'
                ratingValue={product.rating}
              />

              <Details>
                <DetailWrapper>
                  <strong>Type: </strong>
                  <br />
                  <p>{product.details.subType || 'Not specified'}</p>
                </DetailWrapper>

                <DetailWrapper>
                  <strong>ABV: </strong>
                  <br />
                  <p>{product.details.ABV ? `${product.details.ABV}%` : 'Not available'}</p>
                </DetailWrapper>

                {product.details.organic === true && (
                  <DetailWrapper>
                    <p>
                      <strong>Organic: </strong>
                      <i className='fas fa-seedling' />
                    </p>
                  </DetailWrapper>
                )}

                <DetailWrapper>
                  <strong>Description: </strong>
                  <br />
                  <p>{product.details.desc || 'Not available'}</p>
                </DetailWrapper>
              </Details>

              <Image
                src={product.imgUrl === '//:0' || !product.imgUrl ? placeholder : product.imgUrl}
                alt={product.name}
              />
            </ProductInfo>
          </Card>
          <CommentsSection type={product.type} productId={productId} />
        </>
      )}
    </>
  );
};

export default ProductDetail;

const Image = styled.img`
  grid-area: image;

  max-width: 100%;
  height: auto;
  object-position: center;

  @media screen and (min-width: 768px) {
    max-width: 300px;
    max-height: 50%;
  }
`;

const Details = styled.div`
  grid-area: details;

  word-wrap: break-word;
  overflow: hidden;
`;

const DetailWrapper = styled.div`
  margin-bottom: ${spacing.md};
  p,
  ul {
    margin: ${spacing.xs} 0;
  }
`;

const ProductInfo = styled(CardBody)`
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'rating image'
    '. details';
  grid-gap: ${spacing.md};

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, max-content) 1fr;
    grid-template-rows: initial;
    grid-template-areas: 'rating image details';
  }
`;
