import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from 'Store';
import { transition, spacing, green, red } from 'Utilities';

interface Props {}

const UpvoteDownvote: React.FC<Props> = () => {
  const { user } = useContext(UserContext);

  if (user.username === '') {
    return null;
  }

  return (
    <Wrapper>
      <UpvoteButton>
        <i className='fas fa-arrow-alt-up' />
      </UpvoteButton>
      <DownvoteButton>
        <i className='fas fa-arrow-alt-down' />
      </DownvoteButton>
    </Wrapper>
  );
};

export default UpvoteDownvote;

const OptionButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: inherit;
  ${transition({ prop: 'color' })};
`;

const UpvoteButton = styled(OptionButton)`
  &:hover {
    color: ${green};
  }
`;

const DownvoteButton = styled(OptionButton)`
  &:hover {
    color: ${red};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: ${spacing.xs};
`;
