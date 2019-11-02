import React from 'react';
import { ProductProps, MixedProps } from '../SearchForm';
import styled from 'styled-components';
import { spacing } from 'Utilities';
interface Props {
  item: ProductProps<MixedProps>;
}

const MixedDetails: React.FC<Props> = ({ item }) => {
  console.log(item);

  const ingredientNames = item.details.ingredients.map(e => `${e.name}`).join(', ');

  return (
    <>
      <ItemGlassType>{'The Preferred way is with a' + '   ' + item.details.glassType + '.'}</ItemGlassType>
      <ItemDirections>{item.details.directions}</ItemDirections>
    </>
  );
};
export default MixedDetails;

const ItemGlassType = styled.i`
  margin: ${spacing.lg};
`;
const ItemDirections = styled.i`
  text-align: left;
`;
