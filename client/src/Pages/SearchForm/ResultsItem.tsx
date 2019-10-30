import React from 'react';
import { BeerProps, CocktailProps } from './SearchForm';
import { Results } from '../../Elements/Components/Results';

import placeholder from 'Assets/img/placeholder.png';

interface Props {
  item: BeerProps | CocktailProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  return (
    <Results>
      <h2>
        <img
          src={item.imgUrl === '//:0' || !item.imgUrl ? placeholder : item.imgUrl}
          height='35'
          width='35'
          alt='(image not found)'
        ></img>
        {item.name}
        {item.details.organic === true && <i className='fas fa-seedling' />}
      </h2>
      <p>{` ABV: ${item.details.ABV}%`}</p>
      <i className={`far fa-arrow-alt-circle-${item.upvotes.length - item.downvotes.length >= 0 ? 'up' : 'down'}`} />
      {item.upvotes.length - item.downvotes.length}
      <hr></hr> <br></br>
    </Results>
  );
};

export default ResultsItem;
