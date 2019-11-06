import React from 'react';
import { Link as L } from 'react-router-dom';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import { spacing } from 'Utilities';
import placeholder from 'Assets/img/placeholder.png';
import MarkFavButton from './MarkFavButton';

interface Props {
  product: ProductProps;
  highlightedFavorite: ProductProps | null;
  setNewHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavItem: React.FC<Props> = ({ product, highlightedFavorite, setNewHighlighted }) => (
  <Wrapper>
    <MarkFavButton
      productId={product._id}
      highlightedFavorite={highlightedFavorite}
      setNewHighlighted={setNewHighlighted}
    />
    <Link to={`/${product._id}/detail`}>
      <Icon src={product.imgUrl === '//:0' || !product.imgUrl ? placeholder : product.imgUrl} alt={product.name} />
      <Title>{product.name}</Title>
    </Link>
  </Wrapper>
);

export default FavItem;

const Wrapper = styled.article`
  display: flex;
  align-items: center;
  margin: ${spacing.sm} 0;

  > a {
    display: flex;
    align-items: center;
  }
`;

const Link = styled(L)`
  text-decoration: none;
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
  margin: 0 ${spacing.sm};
`;

const Title = styled.h4``;
