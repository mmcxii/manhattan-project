import React from 'react';
import { BeerProps, CocktailProps } from './SearchForm';

interface Props {
  item: BeerProps | CocktailProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  console.log(item);

  return <>howdy</>;
};

export default ResultsItem;
