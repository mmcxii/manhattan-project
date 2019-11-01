import React from 'react';
import { MixedProps } from '../SearchForm';
import styled from 'styled-components';
import { spacing } from 'Utilities';

interface Props {
  item: MixedProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  console.log(item);
  return (
    <>
      <p>{item.details.glassType}</p>
      <p>{item.details.directions}</p>
    </>
  );
};
export default ResultsItem;
