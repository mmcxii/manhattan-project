import React from 'react';
import styled from 'styled-components';

import UpvoteDownvote from './UpvoteDownvote';
import { spacing } from 'Utilities';

interface Props {
  upvotes: number;
  downvotes: number;
}

export const Rating: React.FC<Props> = ({ upvotes, downvotes }) => (
  <Wrapper>
    <UpvoteDownvote />
    <small>
      <Icon className={`far fa-arrow-alt-circle-${upvotes - downvotes >= 0 ? 'up' : 'down'}`} />
      {upvotes - downvotes}
    </small>
  </Wrapper>
);

const Wrapper = styled.div`
  grid-area: rating;

  display: flex;
  align-items: center;
`;

const Icon = styled.i`
  margin: 0 ${spacing.xs};
`;
