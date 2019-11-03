import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { elevation, spacing, grey, transition, greyLight } from 'Utilities';
import { ProductProps, BeerProps, MixedProps } from '../SearchForm';
import placeholder from '../../../Assets/img/placeholder.png';

interface Props {
  item: ProductProps<BeerProps | MixedProps>;
}

export const ResultsItem: React.FC<Props> = props => {
  const { item, children } = props;
  const score = item.upvotes.length - item.downvotes.length;
  const scoreClass = `far fa-arrow-alt-circle-${score >= 0 ? 'up' : 'down'} fa-lg`;

  return (
    <Wrapper to={`/${item._id}/detail`}>
      <ResultImage src={item.imgUrl === '//:0' || !item.imgUrl ? placeholder : item.imgUrl} alt={item.name} />​
      <ResultTitle>{item.name}</ResultTitle>​{/* {children} */}​{children}
      <ItemVotes>
        <h3>
          {`${score}`} <i className={scoreClass} />
        </h3>
      </ItemVotes>
    </Wrapper>
  );
};

export const ResultType = styled.p`
  margin: ${spacing.md} 0;
  grid-area: type;
`;

export const ResultDetails = styled.p`
  grid-area: details;
`;

const ResultTitle = styled.h3`
  grid-area: title;
  padding: ${spacing.sm} 0;
  font-weight: bold;
  font-size: 1.5rem;
`;

const ResultImage = styled.img`
  grid-area: image;
  max-height: 10rem;
`;

const ItemVotes = styled.span`
  grid-area: score;
  font-weight: bold:
  font-size: 30px;
`;

const Wrapper = styled(Link)`
  width: 100%;
  padding: ${spacing.sm};
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-template-rows: repeat(2, max-content) 1fr;
  grid-column-gap: ${spacing.lg};
  // grid-row-gap: ${spacing.lg};
  grid-template-areas:
    'image title score'
    'image type organic'
    'image details .';
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${grey};
  ${transition({ speed: '100ms' })}
  :hover {
    transform: scale(1.01);
    border-color: ${greyLight};
    ${elevation[5]};
  }
  :active {
    background-color: ${greyLight};
  }
`;
