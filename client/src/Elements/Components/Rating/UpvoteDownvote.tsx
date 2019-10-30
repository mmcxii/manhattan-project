import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from 'Store';
import { transition, spacing, green, red } from 'Utilities';

interface Props {
  type: 'products' | 'comments';
  id: string;
}

const UpvoteDownvote: React.FC<Props> = ({ type, id }) => {
  const { user } = useContext(UserContext);

  if (user.username === '') {
    return null;
  }

  const handleVote = async (action: 'upvotes' | 'downvotes') => {
    const lsLoginToken = localStorage.getItem('loginToken');
    const { username } = user;

    if (lsLoginToken) {
      try {
        const queryURL = `/api/${type}/${id}/${action}`;

        const response: Response = await fetch(queryURL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lsLoginToken}`
          },
          body: JSON.stringify({ username })
        });

        const data = await response.json();

        window.location.reload();
      } catch (err) {
        // TODO: Handle errors
        console.log(err);
      }
    }
  };

  return (
    <Wrapper>
      <UpvoteButton onClick={() => handleVote('upvotes')}>
        <i className='fas fa-arrow-alt-up' />
      </UpvoteButton>
      <DownvoteButton onClick={() => handleVote('downvotes')}>
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
