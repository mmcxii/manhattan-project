import React, { Children } from 'react';
import { BeerProps } from '../SearchForm';
import styled from 'styled-components';
import { spacing } from 'Utilities';
import ProductDetail from 'Pages/ProductDetail';

interface Props {
  item: BeerProps;
}

const BeerDetails: React.FC<Props> = ({ item }) => {
  if (item.details.glassType instanceof BeerDetails)
    return (
      <>
        <p>ABV: ${item.details.ABV}%</p>
        <p>{item.details.organic === true && <OrganicIcon className='fas fa-seedling' />} </p>
      </>
    );
};

export default BeerDetails;

const OrganicIcon = styled.i`
  margin-left: ${spacing.sm};
`;
