import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ProductProps } from 'Store';
import { Card, CardHeader, CardBody } from 'Elements';
import placeholder from 'Assets/img/placeholder.png';

interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);

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

          console.log(successData);
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
      {product && (
        <>
          <Card>
            <CardHeader>{product.name}</CardHeader>
            <CardBody>
              {product.details.ABV && <small>ABV: {product.details.ABV}</small>}
              {product.details.organic === true && (
                <p>
                  Organic: <i className='fas fa-seedling' />
                </p>
              )}
              <img
                src={product.imgUrl === '//:0' || !product.imgUrl ? placeholder : product.imgUrl}
                alt={product.name}
              />

              {product.details.desc && <p>{product.details.desc}</p>}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Comments</CardHeader>
            <CardBody>
              {product.comments.length === 0 ? (
                <p>There are no comments for this {product.type === 'BEER' ? 'beer' : 'cocktail recipe'} yet.</p>
              ) : (
                product.comments.map(comment => <p>comment</p>)
              )}
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default ProductDetail;
