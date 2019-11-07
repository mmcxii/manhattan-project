import React, { useState } from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import UpvoteDownvote from './UpvoteDownvote';

interface Props {
  ratingValue: number;
  upvotes: UserProps[];
  downvotes: UserProps[];
  type: 'products' | 'comments';
  id: string;
}

export const Rating: React.FC<Props> = ({ upvotes, downvotes, type, id, ratingValue }) => {
  const [rating, setRating] = useState<number>(ratingValue);

  const updateRating = (newRating: number): void => {
    if (newRating !== rating) {
      setRating(newRating);
    }
  };

  return (
    <Wrapper>
      <UpvoteDownvote
        type={type}
        id={id}
        upvotes={upvotes}
        downvotes={downvotes}
        rating={rating}
        updateRating={r => updateRating(r)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: rating;
  display: flex;
  align-items: center;
  align-self: flex-start;
`;
