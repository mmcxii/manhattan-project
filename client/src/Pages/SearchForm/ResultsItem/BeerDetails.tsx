import React from 'react';
import { BeerProps } from '../SearchForm';
import styled from 'styled-components';
import { spacing } from 'Utilities';

interface Props {
  item: BeerProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  return (
    <>
      <p>ABV: ${item.details.ABV}%</p>
      <p>{item.details.organic === true && <OrganicIcon className='fas fa-seedling' />} </p>
    </>
  );
};

export default ResultsItem;

const OrganicIcon = styled.i`
  margin-left: ${spacing.sm};
`;
