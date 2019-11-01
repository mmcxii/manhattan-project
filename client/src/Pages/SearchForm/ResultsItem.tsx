import React from 'react';
import { BeerProps, CocktailProps } from './SearchForm';

import placeholder from 'Assets/img/placeholder.png';
import styled from 'styled-components';
import { spacing, elevation } from 'Utilities';
import { Link } from 'react-router-dom';

interface Props {
  item: BeerProps | CocktailProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  return (
    <Wrapper to={`/${item._id}/detail`}>
      <h2>
        <img
          src={item.imgUrl === '//:0' || !item.imgUrl ? placeholder : item.imgUrl}
          height='35'
          width='35'
          alt={item.name}
        />
        {item.name}
        {item.details.organic === true && <OrganicIcon className='fas fa-seedling' />}
      </h2>
      <p>ABV: {item.details.ABV}%</p>
      <i className={`far fa-arrow-alt-circle-${item.upvotes.length - item.downvotes.length >= 0 ? 'up' : 'down'}`} />
      {item.upvotes.length - item.downvotes.length}
      <hr></hr> <br></br>
    </Wrapper>
  );
};

export default ResultsItem;

const OrganicIcon = styled.i`
  margin-left: ${spacing.sm};
`;

const Wrapper = styled(Link)`
  transition: all 0.1s ease-in;
  width: 100%;
  display: block;
  text-decoration: none;
  cursor: pointer;
  margin: 0 2px;
  &:hover {
    transform: scale(1.1);
    background: #bbb;
    ${elevation[5]};
  }
`;
