import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { spacing } from 'Utilities';
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
          height='100'
          width='100'
          alt={item.name}
        />
        <ItemName>{item.name}</ItemName>
      </h2>
      {children}
      <ItemVotes
        className={`far fa-arrow-alt-circle-${item.upvotes.length - item.downvotes.length >= 0 ? 'up' : 'down'}`}
      />
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
    transform: scale(1.3);
    background: #bbb;
    ${elevation[5]};
  }
`;

const ItemName = styled.i`
  float: right;
  position: absolute;
  padding-top: 20px;
  margin: ${spacing.lg};
`;
const ItemVotes = styled.i`
  margin: ${spacing.xs};
`;
