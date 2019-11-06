import React from 'react';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import FavItem from './FavItem';

interface Props {
  favorites: ProductProps[];
}

const FavoritesList: React.FC<Props> = ({ favorites }) => (
  <Wrapper>
    {favorites.map(item => (
      <FavItem product={item} key={item._id} />
    ))}
  </Wrapper>
);

export default FavoritesList;

const Wrapper = styled.section``;
