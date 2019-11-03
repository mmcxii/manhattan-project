import React from 'react';
import { ProductProps, BeerProps } from '../SearchForm';
import styled from 'styled-components';
import { spacing } from 'Utilities';
import { ResultType, ResultDetails } from './ResultsItem';

interface Props {
  item: ProductProps<BeerProps>;
}

const OrganicIcon = styled.i.attrs({ className: 'fas fa-seedling fa-lg' })`
  margin-left: ${spacing.sm};
  grid-area: organic;
`;

export const BeerDetails: React.FC<Props> = ({ item }) => {
  const abv = item.details.ABV || 'Not available';
  const isOrganic = item.details.organic === true;
  const beerType = item.details.subType || 'N/A';

  return (
    <>
      <ResultType>
        <strong>Type: </strong>
        {beerType}
      </ResultType>
      <ResultDetails>
        <strong>ABV: </strong>
        {item.details.ABV ? `${abv}%` : abv}
      </ResultDetails>
      {isOrganic && <OrganicIcon />}
    </>
  );
};
