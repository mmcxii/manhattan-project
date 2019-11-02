import React from 'react';
import { ProductProps, MixedProps } from '../SearchForm';
import styled from 'styled-components';
import { spacing } from 'Utilities';
interface Props {
  item: ProductProps<MixedProps>;
}

const MixedDetails: React.FC<Props> = ({ item }) => {
  console.log(item);
  return (
    <>
      <ItemGlassType>{item.details.glassType}</ItemGlassType>
      <p>{item.details.directions}</p>
    </>
  );
};
export default MixedDetails;

const ItemGlassType = styled.i`
  margin: ${spacing.lg};
`;
