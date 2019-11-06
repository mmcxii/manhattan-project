import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import { spacing } from 'Utilities';
import FavItem from './FavItem';

interface Props {
  product: ProductProps;
  highlightedFavorite: ProductProps | null;
  setNewHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
}

const HighlightedFavorite: React.FC<Props> = ({ product, highlightedFavorite, setNewHighlighted }) => {
  return (
    <Wrapper>
      <FavItem product={product} highlightedFavorite={highlightedFavorite} setNewHighlighted={setNewHighlighted} />
    </Wrapper>
  );
};

export default HighlightedFavorite;

const Wrapper = styled.div`
  margin: -${spacing.md};
  margin-bottom: 0;
  padding: ${spacing.sm} ${spacing.md};
  background: rgba(0, 0, 0, 0.25);
`;
