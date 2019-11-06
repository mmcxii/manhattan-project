import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import { spacing } from 'Utilities';
import FavItem from './FavItem';

interface Props {
  product: ProductProps;
}

const HighlightedFavorite: React.FC<Props> = ({ product }) => {
  return (
    <Wrapper>
      <FavItem product={product} />
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
