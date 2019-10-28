import React from 'react';
import { BeerProps, CocktailProps } from './SearchForm';

import placeholder from 'Assets/img/placeholder.png';

interface Props {
  item: BeerProps | CocktailProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {

  return (
    <article>
      <img
        src={item.imgUrl === '//:0' || !item.imgUrl ? placeholder : item.imgUrl}
        height="25"
        width="25"
        alt="Search Result Item"
      ></img>
      {item.name}
      {` ABV: ${item.details.ABV}%`}
      <i className={`far fa-arrow-alt-circle-${item.upvotes.length - item.downvotes.length >= 0 ? 'up' : 'down'}`} />
      {item.upvotes.length - item.downvotes.length}
      {item.details.organic === true && <i className="fas fa-seedling" />}
    </article>
  );
};

export default ResultsItem;
