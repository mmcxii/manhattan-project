import React, { useState } from 'react';
import styled from 'styled-components';

import { UserProps } from 'Store';
import { spacing } from 'Utilities';
import UpvoteDownvote from './UpvoteDownvote';

interface Props {
  upvotes: UserProps[];
  downvotes: UserProps[];
  type: 'products' | 'comments';
  id: string;
}

export const Rating: React.FC<Props> = ({ upvotes, downvotes, type, id }) => {
  const [rating, setRating] = useState<number>(upvotes.length - downvotes.length);

  return (
    <Wrapper>
      <UpvoteDownvote type={type} id={id} setRating={setRating} upvotes={upvotes} downvotes={downvotes} />

      <small>
        <Icon className={`far fa-arrow-alt-circle-${rating >= 0 ? 'up' : 'down'}`} />
        {rating}
      </small>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: rating;

  display: flex;
  align-items: center;
`;

const Icon = styled.i`
  margin: 0 ${spacing.xs};
`;
