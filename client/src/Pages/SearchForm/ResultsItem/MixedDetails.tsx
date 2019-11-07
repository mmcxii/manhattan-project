import React from 'react';
import { ProductProps, MixedProps } from '../SearchForm';
import { ResultType, ResultDetails } from './ResultsItem';

interface Props {
  item: ProductProps<MixedProps>;
}

export const MixedDetails: React.FC<Props> = ({ item }) => {
  const glassType = item.details.glassType || 'any';
  const ingrediants = item.details.ingredients.map(i => i.name).join(', ');

  return (
    <>
      <ResultType>
        <strong>Served in: </strong>
        {glassType}
      </ResultType>
      <ResultDetails>
        <strong>Ingredients: </strong>
        {ingrediants}
      </ResultDetails>
    </>
  );
};
