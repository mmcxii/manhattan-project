import React from 'react';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import FavItem from './FavItem';

interface Props {
  favorites: ProductProps[];
  highlightedFavorite: ProductProps | null;
  setNewHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavoritesList: React.FC<Props> = ({ favorites, highlightedFavorite, setNewHighlighted }) => (
  <Wrapper>
    {favorites.map(item => (
      <FavItem
        product={item}
        key={item._id}
        highlightedFavorite={highlightedFavorite}
        setNewHighlighted={setNewHighlighted}
      />
    ))}
  </Wrapper>
);

export default FavoritesList;

const Wrapper = styled.section``;
