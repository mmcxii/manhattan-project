import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { elevation } from 'Utilities';
import { ProductProps, BeerProps, MixedProps } from '../SearchForm';
import placeholder from 'Assets/img/placeholder.png';

interface Props {
  item: ProductProps<BeerProps | MixedProps>;
}

const ResultsItem: React.FC<Props> = props => {
  const { item, children } = props;

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
      </h2>
      {children}
      <i className={`far fa-arrow-alt-circle-${item.upvotes.length - item.downvotes.length >= 0 ? 'up' : 'down'}`} />
      {item.upvotes.length - item.downvotes.length}
      <hr></hr> <br></br>
    </Wrapper>
  );
};

export default ResultsItem;

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
