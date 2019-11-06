import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import UpvoteDownvote from './UpvoteDownvote';

interface Props {
  rating: number;
  upvotes: UserProps[];
  downvotes: UserProps[];
  type: 'products' | 'comments';
  id: string;
}

export const Rating: React.FC<Props> = ({ rating, upvotes, downvotes, type, id }) => {
  console.log(rating);
  const [ratingState, setRating] = useState<number>(rating);

  return (
    <Wrapper>
      <UpvoteDownvote type={type} id={id} setRating={setRating} upvotes={upvotes} downvotes={downvotes} />

      <small>
        <Icon className={`far fa-arrow-alt-circle-${ratingState >= 0 ? 'up' : 'down'}`} />
        {ratingState}
      </small>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: rating;

  display: flex;
  align-items: center;
  align-self: flex-start;
`;

const Icon = styled.i`
  margin: 0 ${spacing.xs};
`;
