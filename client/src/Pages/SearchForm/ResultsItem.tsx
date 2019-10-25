import React from 'react';
import { BeerProps } from './SearchForm';

interface Props {
  item: BeerProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  console.log(item);

  return (
    <>
      {item.name}
      {/* {item.details[0].image[0].icon} */}
      <hr></hr>
    </>
  );
};

export default ResultsItem;
