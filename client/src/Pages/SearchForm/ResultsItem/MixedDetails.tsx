import React from 'react';
import { ProductProps, MixedProps } from '../SearchForm';

interface Props {
  item: ProductProps<MixedProps>;
}

const MixedDetails: React.FC<Props> = ({ item }) => {
  console.log(item);

  const ingredientNames = item.details.ingredients.map(e => `${e.name}`).join(', ');

  return (
    <>
      <p>{ingredientNames}</p>
    </>
  );
};
export default MixedDetails;
