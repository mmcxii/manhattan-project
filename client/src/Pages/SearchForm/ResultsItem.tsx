import React from 'react';
import { BeerProps } from './SearchForm';

interface Props {
  item: BeerProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  console.log(item);

  return <>howdy</>;
};

export default ResultsItem;
